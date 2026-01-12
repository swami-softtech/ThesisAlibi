import { useState, useEffect } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Code,
  Database,
  Palette,
  Server,
  Star,
  CheckCircle,
  Send,
  Heart,
  Coffee,
  Zap,
} from "lucide-react"

export default function Developer() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [activeSkillCategory, setActiveSkillCategory] = useState("frontend")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // User Data Variables - Easily customizable
  const userData = {
    name: "Tejas Derle",
    title: "Full Stack Developer",
    tagline: "Crafting digital experiences with code and creativity",
    location: "Nashik, Maharashtra, India",
    email: "derletejas@gmail.com",
    phone: "+91 90117 65581",
    avatar: "https://avatars.githubusercontent.com/u/180934001?v=4",
    resumeUrl: "/resume.pdf", // Added missing resumeUrl

    // Availability
    availableForHire: true,
    availabilityText: "Available for freelance projects",

    // Bio
    bio: "Passionate full-stack developer with 2+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful solutions. When I'm not coding, you'll find me exploring new technologies or contributing to open source projects.",

    // Social Links
    social: {
      github: "https://github.com/tejasderle24",
      linkedin: "https://linkedin.com/in/tejas-derle",
      twitter: "https://twitter.com/tejasderle",
      website: "#", // Added missing website URL
    },

    // Experience Stats
    stats: {
      experience: "2+",
      projects: "5+",
      clients: "4+",
    },
  }

  const skills = {
    frontend: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 90, icon: "▲" },
      { name: "TypeScript", level: 88, icon: "📘" },
      { name: "Tailwind CSS", level: 92, icon: "🎨" },
      { name: "Vue.js", level: 85, icon: "💚" },
      { name: "JavaScript", level: 95, icon: "🟨" },
    ],
    backend: [
      { name: "Node.js", level: 90, icon: "🟢" },
      { name: "Python", level: 85, icon: "🐍" },
      { name: "Express.js", level: 88, icon: "🚀" },
      { name: "FastAPI", level: 82, icon: "⚡" },
      { name: "GraphQL", level: 80, icon: "🔗" },
      { name: "REST APIs", level: 92, icon: "🌐" },
    ],
    database: [
      { name: "PostgreSQL", level: 88, icon: "🐘" },
      { name: "MongoDB", level: 85, icon: "🍃" },
      { name: "Redis", level: 80, icon: "🔴" },
      { name: "Prisma", level: 85, icon: "⚡" },
      { name: "Supabase", level: 82, icon: "🚀" },
      { name: "Firebase", level: 78, icon: "🔥" },
    ],
    tools: [
      { name: "Git", level: 95, icon: "📝" },
      { name: "Docker", level: 85, icon: "🐳" },
      { name: "AWS", level: 80, icon: "☁️" },
      { name: "Vercel", level: 90, icon: "▲" },
      { name: "Figma", level: 75, icon: "🎨" },
      { name: "VS Code", level: 98, icon: "💙" },
    ],
  }

  const skillCategories = [
    { id: "frontend", name: "Frontend", icon: Palette },
    { id: "backend", name: "Backend", icon: Server },
    { id: "database", name: "Database", icon: Database },
    { id: "tools", name: "Tools", icon: Code },
  ]

  // Generate random skill widths for visual effect
  const [skillWidths, setSkillWidths] = useState({})

  useEffect(() => {
    const widths = {}
    Object.keys(skills).forEach(category => {
      skills[category].forEach(skill => {
        widths[skill.name] = `${skill.level}%`
      })
    })
    setSkillWidths(widths)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/6 to-cyan-500/6 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Code Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-orange-400/20 text-4xl font-mono animate-bounce delay-300">
          {"<>"}
        </div>
        <div className="absolute top-40 right-20 text-blue-400/20 text-3xl font-mono animate-bounce delay-700">
          {"{}"}
        </div>
        <div className="absolute bottom-40 left-20 text-green-400/20 text-5xl font-mono animate-bounce delay-1000">
          {"[]"}
        </div>
        <div className="absolute bottom-20 right-40 text-purple-400/20 text-2xl font-mono animate-bounce delay-1500">
          {"()"}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center py-20">
          <div
            className={
              "text-center transition-all duration-1000 " +
              (isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")
            }
          >
            {/* Avatar */}
            <div className="relative mb-8">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-orange-500 p-1 bg-gradient-to-r from-orange-500 to-red-500">
                <img
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                  className="w-full h-full object-cover rounded-full bg-neutral-800"
                />
              </div>

              {/* Availability Badge */}
              {userData.availableForHire && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>{userData.availabilityText}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Name & Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              {userData.name}
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-6">
              {userData.title}
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed">{userData.tagline}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-black text-orange-400 mb-1">{userData.stats.experience}</div>
                <div className="text-neutral-400 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-blue-400 mb-1">{userData.stats.projects}</div>
                <div className="text-neutral-400 text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-green-400 mb-1">{userData.stats.clients}</div>
                <div className="text-neutral-400 text-sm">Happy Clients</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-neutral-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{userData.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{userData.phone}</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div
            className={
              "transition-all duration-1000 delay-300 " +
              (isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")
            }
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Me</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-lg text-neutral-300 leading-relaxed">{userData.bio}</p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 bg-neutral-900/50 px-4 py-2 rounded-lg">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span className="text-neutral-300">Open Source Contributor</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-neutral-900/50 px-4 py-2 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-neutral-300">Problem Solver</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 pt-6">
                  <a
                    href={userData.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-orange-500 rounded-xl flex items-center justify-center text-neutral-400 hover:text-orange-400 transition-all duration-300 hover:scale-110"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href={userData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-blue-500 rounded-xl flex items-center justify-center text-neutral-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href={userData.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-sky-500 rounded-xl flex items-center justify-center text-neutral-400 hover:text-sky-400 transition-all duration-300 hover:scale-110"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a
                    href={userData.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-green-500 rounded-xl flex items-center justify-center text-neutral-400 hover:text-green-400 transition-all duration-300 hover:scale-110"
                  >
                    <Globe className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-neutral-400 ml-4 font-mono text-sm">developer.js</span>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-purple-400">
                      const <span className="text-blue-400">developer</span> = {"{"}
                    </div>
                    <div className="text-neutral-400 ml-4">
                      name: <span className="text-green-400">'{userData.name}'</span>,
                    </div>
                    <div className="text-neutral-400 ml-4">
                      title: <span className="text-green-400">'{userData.title}'</span>,
                    </div>
                    <div className="text-neutral-400 ml-4">
                      location: <span className="text-green-400">'{userData.location}'</span>,
                    </div>
                    <div className="text-neutral-400 ml-4">
                      available: <span className="text-orange-400">{userData.availableForHire.toString()}</span>,
                    </div>
                    <div className="text-neutral-400 ml-4">
                      skills: [<span className="text-green-400">'React'</span>,{" "}
                      <span className="text-green-400">'Node.js'</span>,{" "}
                      <span className="text-green-400">'TypeScript'</span>],
                    </div>
                    <div className="text-neutral-400 ml-4">
                      passion: <span className="text-green-400">'Building amazing things'</span>
                    </div>
                    <div className="text-purple-400">{"}"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20">
          <div
            className={
              "transition-all duration-1000 delay-500 " +
              (isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")
            }
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                My{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Skills
                </span>
              </h2>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                Technologies and tools I use to bring ideas to life
              </p>
            </div>

            {/* Skill Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveSkillCategory(category.id)}
                  className={
                    "flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 " +
                    (activeSkillCategory === category.id
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-neutral-900 border border-neutral-700 text-neutral-400 hover:border-orange-500 hover:text-orange-400")
                  }
                >
                  <category.icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills[activeSkillCategory]?.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="text-white font-semibold">{skill.name}</span>
                    </div>
                    <span className="text-orange-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: skillWidths[skill.name] || "0%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div
            className={
              "transition-all duration-1000 delay-1100 " +
              (isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")
            }
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Let's{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Work Together
                </span>
              </h2>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-8">
                Ready to bring your ideas to life? Let's discuss your next project and create something amazing
                together.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-3xl p-12 text-center">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">Ready to Start a Project?</h3>
                <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
                  I'm currently {userData.availableForHire ? "available" : "not available"} for new projects. Let's
                  discuss how we can work together to achieve your goals.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                  <a
                    href={`mailto:${userData.email}`}
                    className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 hover:scale-105 flex items-center space-x-3"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Send Message</span>
                  </a>

                  <a
                    href={`tel:${userData.phone}`}
                    className="group border-2 border-neutral-600 hover:border-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-red-500/10"
                  >
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Schedule Call</span>
                  </a>
                </div>

                <div className="flex justify-center items-center space-x-8 text-neutral-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Quick Response</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Flexible Rates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}