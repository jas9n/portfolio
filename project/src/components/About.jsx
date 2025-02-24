const About = () => {
    return (
        <div className="about-me flex flex-col justify-center items-center text-center">
            <div className="w-40 h-40 rounded-full bg-zinc-100 flex justify-center items-center">
                <p>[pic of me]</p>
            </div>
            <div>
                <p className="">👋 Hello! My name is</p>
                <h1 className="">Jason Chen.</h1>
                <p>I am from Brooklyn, NY & I ❤️ fashion, music, and coding.</p>
                <p>I am currently attending Stony Brook University.</p>
                <p>You can find my resume here.</p>
            </div>
        </div>
    )
}

export default About;