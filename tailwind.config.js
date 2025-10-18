/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'inter': ["Inter_400Regular"],
        'inter-medium' : ["Inter_500Medium"],
        'inter-bold' : ["Inter_400Regular"],
        'poppins': ["Poppins_400Regular"],
        'poppins-medium': ["Poppins_500Medium"],
        'poppins-bold': ["Poppins_600SemiBold"]
      },
    },
  },
  plugins: [],
}

