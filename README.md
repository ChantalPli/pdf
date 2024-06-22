# PDF Document Processor

This project is a backend application that allows uploading, processing, and storing PDF documents. The application extracts specific information from PDFs and saves the details into a MongoDB database.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ChantalPli/pdf.git
    cd pdf
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root of the project and define the following environment variables:
    ```env
    PORT=3000
    MONGODB=<YOUR_MONGODB_URI>
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```

2. The application will be running at `http://localhost:3000`.


##  FRONTEND: `https://github.com/ChantalPli/frontend-pdf`




## Project Structure

```plaintext
project-root/
├── controllers/
│   └── documentController.js
├── models/
│   └── Document.js
├── routes/
│   └── documentRoutes.js
├── services/
│   └── pdfService.js
│   └── storageService.js
├── utils/
│   └── extractors.js
├── uploads/
├── saved_files/
├── config/
│   └── db.js
├── .env
└── app.js

#pdf



