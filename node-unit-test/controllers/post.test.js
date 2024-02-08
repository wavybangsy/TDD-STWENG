const postController = require("./postController");
const postModel = require("../models/post");

// Mocking the getById and create functions of postModel
jest.mock("../models/post", () => ({
  getById: jest.fn(),
  create: jest.fn(),
}));

describe("getPost function", () => {
  it("should have error handling for post not found", () => {
    const mockRequest = {
      params: { id: "blahblah" },
    };
    const mockResponse = {
      render: jest.fn(),
    };

    postModel.getById.mockImplementationOnce((id, callback) => {
      callback(new Error("Post not found"), null);
    });

    postController.getPost(mockRequest, mockResponse);

    expect(postModel.getById).toHaveBeenCalledWith(
      "blahblah",
      expect.any(Function)
    );
    expect(mockResponse.render).toHaveBeenCalledWith("error", {
      errorMessage: "Post not found",
    });
  });
});
