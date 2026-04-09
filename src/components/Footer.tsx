export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Madison Meal Spinner. Built for UW-Madison Students.
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:text-[#c5050c] transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-[#c5050c] transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-[#c5050c] transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
