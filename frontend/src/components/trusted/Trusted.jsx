import './Trusted.css';
const Trusted = () => {

    const companies = [
        "https://www.eventmobi.com/wp-content/uploads/2024/01/01-American-Political-Science-Association-2-300x175.png.webp",
        "https://www.eventmobi.com/wp-content/uploads/2024/01/02-GE-1-300x175.png.webp",
        "https://www.eventmobi.com/wp-content/uploads/2024/01/03-Dawn-300x175.png.webp",
        "https://www.eventmobi.com/wp-content/uploads/2024/01/04-SDM-1-300x175.png.webp",
        "https://www.eventmobi.com/wp-content/uploads/2024/01/05-APNP-300x175.png.webp",
        "https://www.eventmobi.com/wp-content/uploads/2024/01/06-BDP-300x175.png.webp",
        "https://www.eventmobi.com/wp-content/uploads/2024/01/07-WCM-300x175.png.webp",
        "https://www.eventmobi.com/wp-content/uploads/2024/01/09-PMCA-300x175.png.webp",
        "https://www.eventmobi.com/wp-content/uploads/2024/01/08-Meditech-300x175.png.webp",
        "https://www.eventmobi.com/wp-content/uploads/2024/01/10-Benefit-300x175.png.webp",
        "https://www.eventmobi.com/wp-content/uploads/2024/01/11-Cheesecake-300x175.png.webp",
    ];
    

    return (
        <>
            <div className="py-8 companies">
                <h2 className="text-center text-xl font-semibold mb-6">Trusted by Thousands of Associations, Agencies, and Corporations</h2>

                <div className="flex overflow-x-auto scrollbar-hide space-x-8 px-4">
                    {companies.map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt={`Company ${index + 1}`}
                            className="h-20 flex-shrink-0 object-contain"
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Trusted