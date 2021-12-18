# LIBIAM App

To start this project, please have three terminals ready.
One terminal will be used for development server, and the other for the frontend code compilation.

Follow [step 2](#step-2) and [step 3](#step-3) for starting the development server and frontend code compilation.

If you would like the update style.css under `styles/` folder to update tailwind related css, open the third third terminal for tailwind css compilation. You may follow [step 4](#step-4) for this process.

## Step 1

Make sure you

```
npm install
```

## Step 2

Run

```
npm run dev
```

to start the development server.

## Step 3

Compile frontend code by using the following command:

```
npm run compile
```

Check localhost:3000 in your browser and see if the home page loads!

## Step 4

Run the following command (\*Make sure you have `npx` and `tailwindcss cli` installed on your machine):

```
npx tailwindcss -i ./client/components/styles/style.css -o ./public/style.css --watch
```

This will run tailwindcss cli which will compile and output the final css to the public folder. You may not attach the `--watch` flag if you just need to compile it once.

Happy hacking! 💃
