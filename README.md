# README.md for SugarCRM Data Exporter

This is a simple command line utility that fetches data from the SugarCRM API and exports it to a CSV file. It uses yargs for handling command line arguments, dotenv for environment variables and fs/promises for writing the file.

## Getting Started

Before running this utility, make sure to have `Node.js` and `npm` installed on your system.

## Environment Variables

Set up the .env file with your SugarCRM credentials, host, and optionally the API version (default is '10').
```plaintext
USERNAME=your_username
PASSWORD=your_password
HOST=your_host
API_VERSION=your_api_version # Optional, default is '10'
```
 
## Usage

Below is the usage syntax and an example:

```bash
node index.js --module=<module_name> --output=<destination_file.csv>
```

In this command,

- `<module_name>` : Name of the module you want to fetch data from.
- `<destination_file.csv>` : The destination file where you want the fetched data in CSV format.

```bash
node index.js --module=Accounts --output=./data.csv
```

When run, this will fetch data from SugarCRM's Accounts module and write to the `data.csv` file.

## Handling Errors 

The program handles errors gracefully and outputs a meaningful error message when something goes wrong fetching data from the API or writing to disk.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Contact

If you have any questions about this repository, or need further information, don't hesitate to contact me.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.