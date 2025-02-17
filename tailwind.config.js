/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#eeeeee',
                menu_border: 'rgba(69, 102, 252, 1)',
                record_bg: 'rgba(22, 38, 88, 1)'
            },
        },
    },
    plugins: [],
}