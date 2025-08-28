# Testing Troubleshooting

## Jest Not Found

If you encounter a "jest: not found" error, try the following:

1. Install Jest globally:
   ```
   npm install -g jest
   ```

2. Install project dependencies:
   ```
   npm install
   ```

3. Ensure package.json scripts are correctly configured:
   - Check that "test" script points to jest
   - Verify devDependencies include jest and related packages

4. If issues persist, manually install Jest and related packages:
   ```
   npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom
   ```

5. Update Jest configuration in package.json and create a jest.config.js if needed

## Common Debugging Steps
- Verify Node.js and npm versions
- Clear npm cache: `npm cache clean --force`
- Remove node_modules and reinstall: 
  ```
  rm -rf node_modules
  npm install
  ```