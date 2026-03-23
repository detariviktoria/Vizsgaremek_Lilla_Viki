const request = require("supertest");
const app = require("../app");
const path = require("path");
const fs = require("fs");

describe("Upload API Tests", () => {
    const testImagePath = path.join(__dirname, "test-image.png");

    beforeAll(() => {
        // Create a dummy image file for testing
        fs.writeFileSync(testImagePath, "dummy content");
    });

    afterAll(() => {
        // Clean up the dummy image file
        if (fs.existsSync(testImagePath)) {
            fs.unlinkSync(testImagePath);
        }
        // Note: The uploaded file will remain in the Képek folder unless we clean it up too
        // but for simplicity we might leave it or try to find it.
    });

    test("POST /upload should upload a file", async () => {
        const res = await request(app)
            .post("/upload")
            .attach("image", testImagePath);
        
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Fájl sikeresen feltöltve");
        expect(res.body.filename).toBe("test-image.png");

        // Clean up the uploaded file from the real folder
        const uploadedPath = path.join(__dirname, "../../../Képek", "test-image.png");
        if (fs.existsSync(uploadedPath)) {
            fs.unlinkSync(uploadedPath);
        }
    });

    test("POST /upload should return 400 if no file is uploaded", async () => {
        const res = await request(app).post("/upload");
        expect(res.status).toBe(400);
    });
});
