# Image Processing API

A simple Express API that resizes images to user-specified dimensions and caches the results for faster subsequent access.

---

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   gh repo clone fatimarajab12/udacityTask1-Image-Processing
   cd udacityTask1-Image-Processing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   The server will run at [http://localhost:3000](http://localhost:3000).

5. **Access the image resizing endpoint:**
   ```
   http://localhost:3000/api/images?filename=fjord&width=200&height=200
   ```
   - Replace `fjord` with the actual filename (without extension) of an image in your images folder.
   - The first request resizes and caches the image; subsequent requests serve the cached image.

---

## 🖼️ Image Resizing API

**GET** `/api/images`

### Query Parameters

| Parameter | Type   | Required | Description                                 |
|-----------|--------|----------|---------------------------------------------|
| filename  | string | Yes      | Name of the image file (without extension)  |
| width     | number | Yes      | Desired width in pixels                     |
| height    | number | Yes      | Desired height in pixels                    |

#### Example

```
http://localhost:3000/api/images?filename=fjord&width=200&height=200
```

---

## 🧪 Testing

Run the test suite with:
```bash
npm run test
```

---

## 🛠️ Scripts

- `npm start` — Start the server
- `npm run build` — Compile TypeScript to JavaScript
- `npm run test` — Run all tests
- `npm run lint` — Lint TypeScript files
- `npm run format` — Format code with Prettier

---

## 📚 References

- [Node.js Documentation](https://nodejs.org/docs/latest-v12.x/api/)
- [Express Documentation](https://expressjs.com/en/5x/api.html)
- [Sharp (Image Processing)](https://sharp.pixelplumbing.com/api-resize)
- [Jasmine Documentation](https://jasmine.github.io/)

---

**Tip:**  
Replace `fjord` in the example URL with the actual filename (without extension) of an image present in your `src/images` directory.
