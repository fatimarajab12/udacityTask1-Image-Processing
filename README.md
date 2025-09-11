# image-processing-API
An image processing API that resizes and saves images to user specifications when visiting a URL

Start coding by: Nhu Y Ho 

- Clone this repo : https://github.com/nhuyho/image-processing-API.git;
- Remove git remote
- Add new git remote to new service repo
- Update project name at (package.json, newrelic,...)

## Quick Start

1. Install dependencies:
   ```
   npm install
   ```
2. Build the project:
   ```
   npm run build
   ```
3. Start the server:
   ```
   npm start
   ```
   The server will run on [http://localhost:3000](http://localhost:3000).

4. Access the image resizing endpoint in your browser or API tool:

   ```
   http://localhost:3000/api/images?filename=fjord&width=200&height=200
   ```

   - Replace `fjord` with the actual filename (without extension) of an image in your images folder.
   - The first request resizes and caches the image; subsequent requests serve the cached image.

---

## Dependencies 

To install the dependencies for this project, run the following command: 
```
npm install
```

## Build and run the server
After installing the dependencies, run the following command to build typescript into javascript and save them in build folder:

```
npm run build
```

Start the Server:
```
npm start
```
This command will run the server  on port 3000. 

## Testing
```
npm run test
```

## Image Resizing API

### Endpoint

**GET** `/api/images`

#### Query Parameters:
- `filename` (string, required): The name of the image file (without extension)
- `width` (number, required): The desired width in pixels
- `height` (number, required): The desired height in pixels

#### Example

If you have an image named `fjord.jpg` in your images folder, you can resize it to 200x200 pixels with:

```
http://localhost:3000/api/images?filename=fjord&width=200&height=200
```

- The first request will resize and cache the image.
- Subsequent requests with the same parameters will serve the cached image.

## References

1. [Node.js Documentation](https://nodejs.org/docs/latest-v12.x/api/). 
2. [Express Documentation](https://expressjs.com/en/5x/api.html). 
3. [Resize API](https://sharp.pixelplumbing.com/api-resize).
4. [Jasmine Documentation](https://jasmine.github.io/).
