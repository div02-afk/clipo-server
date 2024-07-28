# Clipo Server

The Clipo Server is the backend component of the Clipo clipboard syncing application. It handles the storage, encryption, and retrieval of clipboard contents, ensuring secure and seamless synchronization across multiple devices.

## Features

- **Secure Storage**: Encrypts clipboard contents before storing them in MongoDB.
- **One-Time ID Access**: Provides access to clipboard contents using a secure one-time ID.
- **API Endpoints**: Offers RESTful API endpoints for clipboard operations.
- **Node.js Backend**: Built using Node.js for scalability and performance.



## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/div02-afk/clipo-server.git
    cd clipo-server
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    ENCRYPTION_KEY=your_encryption_key
    ENCRYPTION_VI = your_encryption_vi
    ```

4. **Start the server**:
    ```sh
    npm run dev
    ```

The server will start on the default port `3000`. You can change the port by setting the `PORT` environment variable in the `.env` file.

## API Endpoints

### Clipboard Operations

- **Create Clipboard Id**:
    - **Endpoint**: `Get /api/get-credentials`
    - **Description**: Generates a new Id.
    - **Response**:
        ```json
        {
            "id": "Your new Clipboard Id"
        }
        ```

- **Copy to Clipboard**:
    - **Endpoint**: `POST /api/copy-event`
    - **Description**: Stores encrypted clipboard content.
    - **Request Body**:
        ```json
        {
            "id": "Your clipboard id",
            "text":"Your clipboard content"
        }
        ```
    - **Response**:
        ```json
        {
            "message": "Copied"
        }
        ```

- **Paste from Clipboard**:
    - **Endpoint**: `POST /api/paste-event`
    - **Description**: Retrieves decrypted clipboard content using the one-time ID.
    - **Response**:
        ```json
        {
            "text": "Your clipboard content"
        }
        ```

## Project Structure

- **src/**: Contains the server code.
    - **controllers/**: Handles request processing and response.
    - **models/**: Defines data models and schemas.
    - **utils/**: Contains utility functions, including encryption and decryption.

## Security

- **Encryption**: Clipboard contents are encrypted before being stored in MongoDB, ensuring that your data remains secure.
- **One-Time ID**: Access the shared clipboard using a one-time ID to prevent unauthorized access.

## Contributing

We welcome contributions to improve the Clipo Server! Here are some ways you can contribute:

- Report bugs and issues
- Submit feature requests
- Create pull requests to fix bugs or add new features
