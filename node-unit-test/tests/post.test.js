const postController = require("../controllers/postController");
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

  it("Should return a post", () => {
    const mockRequest = {
      params: { id: "123" }, // Assuming valid post ID
    };
    const mockResponse = {
      render: jest.fn(),
    };

    const samplePost = {
      _id: "123",
      title: "Lord of the Rings",
      content: "Bilbo Baggins is so Cute?",
    };

    postModel.getById.mockImplementationOnce((id, callback) => {
      callback(null, samplePost); // Simulate successful retrieval of post
    });

    postController.getPost(mockRequest, mockResponse);

    expect(postModel.getById).toHaveBeenCalledWith(
      "123",
      expect.any(Function)
    );
    expect(mockResponse.render).toHaveBeenCalledWith("singlepost", {
      pageTitle: "Lord of the Rings",
      post: "Bilbo Baggins is so Cute?"
    });
  });
});
