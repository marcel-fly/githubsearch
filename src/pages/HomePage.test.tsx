import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { searchUsers as mockSearchUsers } from "../api/github";

jest.mock("../api/github", () => ({
  searchUsers: jest.fn(),
  getUserRepos: jest.fn(() => Promise.resolve({ data: [] })),
}));

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input and button", () => {
    renderWithClient(<HomePage />);
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("does not call API on initial render", () => {
    renderWithClient(<HomePage />);
    expect(mockSearchUsers).not.toHaveBeenCalled();
  });

  test("calls API when search button is clicked with non-empty input", async () => {
    renderWithClient(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "testuser" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() =>
      expect(mockSearchUsers).toHaveBeenCalledWith("testuser"),
    );
  });

  test("does not call API if input is empty", () => {
    renderWithClient(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(mockSearchUsers).not.toHaveBeenCalled();
  });

  test("displays users returned from API", async () => {
    (mockSearchUsers as jest.Mock).mockResolvedValueOnce({
      data: {
        items: [{ login: "testuser1" }, { login: "testuser2" }],
      },
    });

    renderWithClient(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "testuser" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(await screen.findByText("testuser1")).toBeInTheDocument();
    expect(await screen.findByText("testuser2")).toBeInTheDocument();
  });

  test('shows "No users found" message when no users are returned', async () => {
    (mockSearchUsers as jest.Mock).mockResolvedValueOnce({
      data: {
        items: [],
      },
    });

    renderWithClient(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "testuser" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() =>
      expect(screen.getByText("No users found")).toBeInTheDocument(),
    );
  });
});
