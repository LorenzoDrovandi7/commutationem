# Commutationem

**Commutationem** is a currency conversion web application that allows users to quickly and easily convert between different currencies. This project features a clean user interface, dark mode toggle, and includes various validations to ensure accurate input. It is designed to be responsive, providing a seamless experience across all devices.

## Features

- **Real-time currency conversion**: Convert between multiple currencies using up-to-date exchange rates.
- **Dark mode**: Toggle between light and dark themes for better user experience.
- **Input validation**: Ensures valid currency inputs, preventing errors in conversions.
- **Responsive design**: Optimized for both desktop and mobile devices.
- **API integration**: Uses a reliable currency conversion API for accurate and real-time exchange rates.

## Technologies Used

- **HTML5** for the structure of the web pages.
- **CSS3 & Bootstrap** for styling and responsive design.
- **JavaScript (ES6)** for the dynamic functionalities and input validations.
- **API Integration** for fetching real-time exchange rates.
- **Cypress** for testing functionalities to ensure smooth performance and bug-free experience.

## Getting Started

### Prerequisites

To run the project locally, you need to have:

- **Node.js** installed
- A text editor or IDE (such as VS Code)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/commutationem.git
   ```

2. Navigate to the project directory:

   ```bash
   cd commutationem
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Start the application locally:

   ```bash
   npm start
   ```

5. Open the project in your browser:

   ```bash
   http://localhost:3000
   ```

### Testing

To run the tests using Cypress:

1. Install Cypress:

   ```bash
   npm install cypress --save-dev
   ```

2. Open the Cypress test runner:

   ```bash
   npx cypress open
   ```

3. Run the tests to ensure the application functions as expected.

## API Integration

Commutationem uses an external API to fetch real-time currency conversion data. You will need to sign up for an API key from the currency provider and configure it in the environment variables.

1. Get your API key from [currency API provider].
2. Create a `.env` file and add your API key:

   ```bash
   API_KEY=your_api_key_here
   ```

3. The application will now use this key to make requests to the currency conversion API.

## Contributing

Feel free to submit pull requests or open issues to help improve the project. All contributions are welcome!

## License

This project is licensed under the MIT License.
