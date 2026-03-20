# CSV to Keyed JSON Converter

A simple, client-side web application that converts CSV (Comma-Separated Values) files into keyed JSON format. This tool transforms tabular CSV data into a JSON object where each row becomes a nested object keyed by a specified column value.

## Features

- **File Upload**: Support for CSV, TSV, and TXT files
- **Flexible Delimiters**: Auto-detection or manual selection of field separators (comma, tab, semicolon, pipe)
- **Encoding Support**: UTF-8 and ISO-8859-1 encodings
- **Key Field Selection**: Choose any column to use as the JSON object key
- **Data Type Detection**: Automatic conversion of numbers and booleans
- **Customization Options**:
  - Convert "NULL" strings to null values
  - Treat empty fields as null
  - Skip empty fields entirely
  - Case transformation for attribute names (as-is, lowercase, uppercase)
  - Header row detection
  - Terse mode output (one object per line)
- **Download Support**: Export converted JSON as a file
- **Real-time Preview**: View JSON output in a formatted textarea

## Usage

1. **Load CSV File**: Click "Choose File" and select your CSV file
2. **Configure Options** (optional):
   - Select field separator if auto-detection fails
   - Choose encoding (default: UTF-8)
   - Pick the key field (column to use as JSON keys)
   - Adjust case options and data processing checkboxes
3. **Convert**: Click the "⚡ Convert" button
4. **Download**: Use "⬇ Download JSON" to save the result

## Example

Given a CSV file:
```csv
id,name,age,city
1,John,25,New York
2,Jane,30,London
3,Bob,35,Paris
```

With "id" selected as the key field, the output JSON will be:
```json
{
  "1": {
    "name": "John",
    "age": 25,
    "city": "New York"
  },
  "2": {
    "name": "Jane",
    "age": 30,
    "city": "London"
  },
  "3": {
    "name": "Bob",
    "age": 35,
    "city": "Paris"
  }
}
```

## Requirements

- Modern web browser with JavaScript enabled
- Internet connection (for PapaParse library loading)

## Browser Support

Works in all modern browsers that support:
- File API
- ES6+ JavaScript features
- CSS Grid and Flexbox

## Project Structure

```
csv_to_keyed_json/
├── main.html          # Main HTML file with UI
├── script.js          # JavaScript logic (ES6 class-based)
└── README.md          # This file
```

## Dependencies

- [PapaParse](https://www.papaparse.com/) - CSV parsing library (loaded via CDN)

## Privacy

This is a client-side application. Your CSV files are processed entirely in your browser and are never uploaded to any server.

## License

This project is open source. Feel free to use, modify, and distribute.
