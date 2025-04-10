// src/components/Footer.tsx
// Footer component displays a simple footer at the bottom of the page
const Footer = () => {
  return (
    // Footer with background color, white text, center alignment, padding, and top margin
    <footer className="bg-blue-700 text-white text-center p-3 mt-8">
      {/* Display current year dynamically with copyright */}
      &copy; {new Date().getFullYear()} UToledo Indoor Navigation
    </footer>
  );
};

export default Footer; // Export Footer for use in other components
