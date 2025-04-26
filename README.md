# Dev.to Clone

This project is a clone of the popular developer community platform **Dev.to**. It aims to replicate the core functionalities of Dev.to while offering a customizable and extendable architecture.

## Features


- User authentication and authorization (using NextAuth or similar solutions)
- Post creation, editing, and deletion
- Commenting system
- Like and bookmark functionality
- Profile management
- Responsive design

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Bun.js](https://bun.sh/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth](https://next-auth.js.org/) (or an alternative)
- **Styling**: CSS/SCSS or Tailwind CSS

## Installation


To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Abdulazizcoderdim/devto-clone.git
   cd devto-clone
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and add the necessary variables. For example:
   ```env
   DATABASE_URL="your-mongodb-connection-string"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret"
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   bun dev
   ```

## Usage

1. Navigate to `http://localhost:3000` in your browser.
2. Sign up or log in to access the platform.
3. Explore the features like creating posts, commenting, and more.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a feature or fix a bug"
   ```
4. Push the branch to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## Author


- **Abdulaziz** - [Abdulazizcoderdim](https://github.com/Abdulazizcoderdim)

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
