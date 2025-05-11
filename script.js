document.addEventListener("DOMContentLoaded", () => {
    // Scroll to top on page load/refresh
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Also add an event listener for the load event
    window.addEventListener('load', () => {
        window.scrollTo(0, 0);
    });

    // Set dark mode by default
    const themeToggle = document.querySelector(".theme-toggle")
    const body = document.body

    // Default to dark mode
    body.classList.add("dark-mode")
    updateThemeIcon(true)
    localStorage.setItem("theme", "dark")

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode")
        const isDarkMode = body.classList.contains("dark-mode")

        // Save preference to localStorage
        localStorage.setItem("theme", isDarkMode ? "dark" : "light")

        // Update icon
        updateThemeIcon(isDarkMode)
    })

    function updateThemeIcon(isDarkMode) {
        const icon = themeToggle.querySelector("svg")
        if (isDarkMode) {
            icon.innerHTML =
                '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'
        } else {
            icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
        }
    }

    // Custom cursor
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px"
        cursor.style.top = e.clientY + "px"

        setTimeout(() => {
            cursorFollower.style.left = e.clientX + "px"
            cursorFollower.style.top = e.clientY + "px"
        }, 100)
    })

    document.addEventListener("mousedown", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(0.7)"
        cursorFollower.style.transform = "translate(-50%, -50%) scale(0.7)"
    })

    document.addEventListener("mouseup", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
    })

    // Add hover effect to links and buttons
    const links = document.querySelectorAll(
        "a, button, .project-card, .contact-card, .certification-card, .timeline-content",
    )

    links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
            cursorFollower.style.width = "50px"
            cursorFollower.style.height = "50px"
            cursor.style.opacity = "0.5"
        })

        link.addEventListener("mouseleave", () => {
            cursorFollower.style.width = "30px"
            cursorFollower.style.height = "30px"
            cursor.style.opacity = "1"
        })
    })

    // Header scroll effect
    const header = document.querySelector("header")

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled")
        } else {
            header.classList.remove("scrolled")
        }
    })

    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const nav = document.querySelector("nav")

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active")
        nav.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll("nav ul li a")

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active")
            nav.classList.remove("active")
        })
    })

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section")

    window.addEventListener("scroll", () => {
        let current = ""

        sections.forEach((section) => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute("id")
            }
        })

        navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active")
            }
        })
    })

    // Project filter
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Remove active class from all buttons
            filterBtns.forEach((btn) => btn.classList.remove("active"))

            // Add active class to clicked button
            this.classList.add("active")

            const filter = this.getAttribute("data-filter")

            projectCards.forEach((card) => {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.style.display = "block"
                } else {
                    card.style.display = "none"
                }
            })
        })
    })

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect()
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
    }

    // Animate skill bars when scrolled into view
    function animateSkillBars() {
        const skillItems = document.querySelectorAll(".skill-item")

        skillItems.forEach((item) => {
            if (isInViewport(item)) {
                const progressBar = item.querySelector(".skill-progress")
                const percentage = item.querySelector(".skill-percentage").textContent

                // Reset width to 0 before animating
                progressBar.style.width = "0%"

                // Use setTimeout to ensure the reset is applied before animation
                setTimeout(() => {
                    progressBar.style.width = percentage
                }, 50)
            }
        })
    }

    // Animate elements on scroll
    function animateOnScroll() {
        // Project cards animation
        const projectCards = document.querySelectorAll(".project-card")
        projectCards.forEach((card, index) => {
            if (isInViewport(card)) {
                setTimeout(() => {
                    card.classList.add("fade-in")
                }, index * 100)
            } else {
                card.classList.remove("fade-in")
            }
        })

        // Contact cards animation
        const contactCards = document.querySelectorAll(".contact-card")
        contactCards.forEach((card, index) => {
            if (isInViewport(card)) {
                setTimeout(() => {
                    card.classList.add("fade-in")
                }, index * 100)
            } else {
                card.classList.remove("fade-in")
            }
        })

        // Contact form animation
        const contactForm = document.querySelector(".contact-form")
        if (contactForm) {
            if (isInViewport(contactForm)) {
                contactForm.classList.add("fade-in")
            } else {
                contactForm.classList.remove("fade-in")
            }
        }

        // Timeline items animation
        const timelineItems = document.querySelectorAll(".timeline-item")
        timelineItems.forEach((item, index) => {
            if (isInViewport(item)) {
                setTimeout(() => {
                    item.classList.add("fade-in")
                }, index * 150)
            } else {
                item.classList.remove("fade-in")
            }
        })
    }

    // Add animation for certification cards
    function animateCertifications() {
        const certificationCards = document.querySelectorAll(".certification-card")

        certificationCards.forEach((card, index) => {
            if (isInViewport(card)) {
                setTimeout(() => {
                    card.classList.add("fade-in")
                }, index * 150)
            } else {
                card.classList.remove("fade-in")
            }
        })
    }

    // Form submission
    const contactForm = document.getElementById("contactForm")

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // Get form values
            const name = document.getElementById("name").value
            const email = document.getElementById("email").value
            const subject = document.getElementById("subject").value
            const message = document.getElementById("message").value

            // Here you would typically send the form data to a server
            // For demo purposes, we'll just log it to the console
            console.log("Form submitted:", { name, email, subject, message })

            // Show success message (in a real application)
            alert("Thank you for your message! I will get back to you soon.")

            // Reset form
            contactForm.reset()
        })
    }

    // Call animation functions on scroll
    window.addEventListener("scroll", animateSkillBars)
    window.addEventListener("scroll", animateOnScroll)
    window.addEventListener("scroll", animateCertifications)

    // Initial calls
    setTimeout(() => {
        animateSkillBars()
        animateOnScroll()
        animateCertifications()
    }, 500)
})
