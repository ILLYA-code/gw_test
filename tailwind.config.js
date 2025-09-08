/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './gw_test/templates/**/*.html',
    './mainapp/templates/**/*.html',
    './templates/**/*.html',
    './static/src/**/*.js',
  ],
  safelist: [
    'py-[8px]',
    'px-[12px]',
    'font-bold',
    'hover:bg-gray-200',
    'cursor-pointer',
    'text-[14px]',
    'gap-[10px]',
    'hover:bg-[#F4F4F4]',
    'underline',
    'w-[60px]',
    'h-[70px]',
    'object-cover',
    'text-[#747474]',
    'h-10',
    'bg-[#d9d9d9]',
    'p-2.5',
    'duration-2000',
    'font-bold'
  ],
  theme: {
    extend: {
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
