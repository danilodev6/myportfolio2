const ButtonBookCall = () => {
  const handleBookCall = () => {
    const email = "danilo.dev6@gmail.com";
    const subject = "Let's discuss a potential collaboration";
    const body = `Hi Danilo,

I came across your portfolio and I'm impressed by your work! I'd love to discuss a potential project/collaboration opportunity.

Could we schedule a call to talk about:
- Project requirements and scope
- Timeline and availability
- Budget and terms

Looking forward to hearing from you.

Best regards,`;

    // Create mailto URL with encoded parameters
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the user's default email client
    window.location.href = mailtoUrl;
  };

  return (
    <button
      type="button"
      onClick={handleBookCall}
      className="group relative flex md:min-w-[280px] h-fit w-fit items-center justify-center overflow-hidden bg-stone-800 px-8 py-4 tracking-wider text-white-platinum transition-all duration-500"
      style={{ borderRadius: "50px" }}
    >
      {/* Background expanding effect */}
      <span className="absolute inset-0 z-10 block overflow-hidden" style={{ borderRadius: "50px" }}>
        <span
          className="block h-full w-full translate-y-full bg-stone-base transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
          style={{ borderRadius: "50px" }}
        />
      </span>
      {/* Text container */}
      <span className="relative z-20 block overflow-hidden h-12 text-xl md:text-2xl">
        <span className="transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full h-12 flex items-center justify-center">
          Book a call
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block ml-1"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Arrow icon</title>
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </span>
        <span className="absolute top-full w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full h-12 flex items-center justify-center">
          Book a call
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block ml-1"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Arrow icon</title>
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </span>
      </span>
    </button>
  );
};

export default ButtonBookCall;
