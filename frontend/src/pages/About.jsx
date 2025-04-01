import React from 'react';
import { useTheme } from '../components/ThemeProvider';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import about_image from '../assets/about_image.png';
import { doctors } from '../assets/assets';

const About = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      title: "Expert Medical Staff",
      description: "Our team of experienced healthcare professionals is dedicated to providing the best care.",
      icon: "👨‍⚕️"
    },
    {
      title: "Modern Facilities",
      description: "State-of-the-art medical equipment and comfortable patient care areas.",
      icon: "🏥"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock medical assistance and emergency care services.",
      icon: "🕒"
    },
    {
      title: "Patient Care",
      description: "Personalized healthcare plans and compassionate patient support.",
      icon: "❤️"
    },
  ];

  const team = doctors.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
            >
              About Us
            </motion.span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Providing Quality Healthcare Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We are committed to delivering exceptional medical care with compassion and expertise.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/appointment" className="inline-block px-8 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                Schedule a Visit
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At our dispensary, we strive to provide accessible, high-quality healthcare services to our community. Our mission is to ensure that every patient receives personalized care and attention, supported by the latest medical technology and expertise.
              </p>
              <p className="text-muted-foreground">
                We believe in building lasting relationships with our patients and their families, creating a healthcare environment that is both professional and welcoming.
              </p>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={about_image}
                  alt="Medical facility"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-muted/50 dark:bg-muted/10"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer comprehensive healthcare services with a focus on patient comfort and satisfaction.
            </p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-2xl"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Medical Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet our experienced healthcare professionals dedicated to your well-being.
            </p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-muted-foreground">{member.specialization}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm">Experience: {member.experience} years</p>
                    <p className="text-sm">Rating: {member.rating}/5</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-primary/5 dark:bg-primary/10"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule your appointment today and experience the difference in healthcare services.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/appointment" className="inline-block px-8 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                Book an Appointment
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
 