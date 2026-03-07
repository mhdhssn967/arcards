import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: 'AnimalAR is an augmented reality mobile application developed by Oqulix Private Limited that allows users to scan physical animal cards (purchased from our website) and view interactive 3D animal models in augmented reality. This Privacy Policy explains what information we collect when you use AnimalAR, how we use it, how we protect it, and your rights regarding your data.'
    },
    {
      id: 'information-collected',
      title: 'Information We Collect',
      subsections: [
        {
          heading: 'From the Mobile App',
          content: 'When you use AnimalAR on your mobile device, we collect only the minimal data required for core functionality and analytics:',
          points: [
            'Device ID and Device Information: Unique device identifier used for app licensing, crash reporting, and analytics tracking.',
            'Camera Usage: We require camera access to scan animal cards and display AR content. The camera feed itself is processed locally on your device and is not stored on our servers.',
            'Scan Interaction Data: Information about which cards you scan, frequency of scans, and duration of AR viewing sessions.',
            'Performance Data: App performance metrics, crash reports, and error logs to improve stability and user experience.',
            'Device Settings: Optional data such as device model, OS version, and app version to optimize compatibility and performance.',
            'Analytics Data: Non-identifiable usage patterns and app engagement metrics.'
          ]
        },
        {
          heading: 'Personal Information',
          content: 'The app does NOT collect personal contact details such as names, email addresses, phone numbers, or payment information unless you explicitly provide them when creating a user account for features such as progress tracking or cloud saves. If you choose to create an account, we collect:',
          points: [
            'Username or display name',
            'Email address (for account recovery and notifications)',
            'Optional profile preferences and avatar customization'
          ]
        },
        {
          heading: 'Location Data',
          content: 'AnimalAR does not require or collect location data. Your device location is never accessed or transmitted to our servers.'
        }
      ]
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Information',
      content: 'We use collected data strictly for the following purposes:',
      points: [
        'Enable app licensing and authenticate devices',
        'Provide AR scanning functionality and display 3D animal models',
        'Track your scan history and app engagement (if you have an account)',
        'Send you important app updates and notifications about new card packs',
        'Improve app performance, stability, and feature development',
        'Generate anonymous usage analytics to understand user behavior patterns',
        'Diagnose technical issues and improve overall user experience',
        'Comply with legal obligations and prevent fraudulent activity'
      ]
    },
    {
      id: 'data-sharing',
      title: 'How We Share Your Data',
      content: 'We do NOT sell, rent, or share your personal information with third parties for marketing purposes. Data sharing is limited to:',
      points: [
        'Service Providers: Third-party services that help us deliver the app (analytics, crash reporting, cloud storage) receive only the minimal data needed for their function',
        'Legal Requirements: We may disclose data when required by law or to protect the rights and safety of our users',
        'Business Transfers: In the event of a merger, acquisition, or bankruptcy, your data may be transferred as part of the transaction'
      ]
    },
    {
      id: 'data-storage',
      title: 'Data Storage & Security',
      content: 'All user account data and scan history for AnimalAR is stored securely using Firebase (Google Cloud). Google maintains compliance with GDPR, CCPA, and other international data protection standards.',
      points: [
        'End-to-End Encryption: Data in transit is encrypted using HTTPS/TLS protocols',
        'Access Controls: Production database access is restricted to authorized personnel only',
        'Regular Backups: Your data is backed up regularly to prevent loss',
        'Security Monitoring: Continuous monitoring for unauthorized access attempts',
        'Data Retention: Account data is retained as long as your account is active. You may request deletion at any time'
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Data Rights & Deletion Requests',
      content: 'You have the right to access, modify, or delete your personal data. To exercise these rights:',
      points: [
        'Account Deletion: You can delete your account and all associated data directly through the app settings',
        'Data Export: You may request a copy of your data by contacting our privacy team',
        'Deletion Request: If you cannot delete through the app, contact us at contact@oqulix.com and we will delete your data within 15 business days',
        'Right to Withdraw Consent: You may withdraw consent for data collection at any time through app settings'
      ]
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      content: 'AnimalAR integrates with the following third-party services:',
      points: [
        'Firebase (Google LLC): Secure data storage, authentication, and real-time database functionality',
        'Google Analytics: Non-identifiable app usage metrics and user engagement analytics',
        'Sentry or Equivalent: Crash reporting and performance monitoring to improve app stability',

      ]
    },
    {
      id: 'cookies',
      title: 'Cookies & Similar Technologies',
      content: 'The AnimalAR mobile app does not use cookies. However, if you access our website to purchase card packs, we may use cookies to:',
      points: [
        'Remember your shopping preferences',
        'Track website analytics',
        'Enable secure login sessions',
        'You can disable cookies through your device settings, though this may affect website functionality'
      ]
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      content: 'AnimalAR is designed to be family-friendly and safe for children. However, parental consent is important:',
      points: [
        'Age Restriction: We comply with COPPA (Children\'s Online Privacy Protection Act) and similar laws',
        'Parental Consent: Users under 13 (or applicable age in your region) require parental consent to create accounts',
        'Limited Data: We collect minimal data from users of any age',
        'No Third-Party Ads: The app contains no third-party advertising or tracking'
      ]
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      content: 'Your data may be processed and stored in multiple jurisdictions. By using AnimalAR, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection laws. We ensure adequate safeguards through Standard Contractual Clauses and other mechanisms recognized under international law.'
    },
    {
      id: 'policy-changes',
      title: 'Policy Updates',
      content: 'We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Material changes will be notified to you via:',
      points: [
        'In-app notification on your next app launch',
        'Email notification if you have an account',
        'Updated policy posted on our website',
        'Continued use of the app after updates constitutes acceptance of the revised policy'
      ]
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: 'If you have questions about this Privacy Policy, wish to access your data, or want to report a privacy concern:',
      points: [
        'Email: contact@oqulix.com',
        'Website: www.oqulix.com',
        'Address: Oqulix Private Limited, 1st Floor A Square Building, Edappally, Edathala PO, Ernakulam, Kerala 683561, India',
        'Response Time: We aim to respond to all inquiries within 7 business days'
      ]
    }
  ];

  return (
    <div className="privacy-policy-wrapper">
      {/* Scroll progress bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header section */}
      <div className="privacy-header">
        
        <div className="privacy-header-content flex flex-col items-center">
            <img src="OQ72.png" width={"60px"} alt="" />
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">HappyLenz - Augmented Reality Card Scanning App</p>
          <p className="policy-meta">
            Effective Date: <strong>March 2026</strong> • Organization: <strong>Oqulix Private Limited</strong>
          </p>
        </div>
        
      </div>

      {/* Table of contents */}
      <div className="table-of-contents">
        <h2>Quick Navigation</h2>
        <ul className="toc-list">
          {sections.map(section => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="toc-link">
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="privacy-content">
        {sections.map((section, index) => (
          <section 
            key={section.id} 
            id={section.id} 
            className="policy-section"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div 
              className="section-header"
              onClick={() => toggleSection(section.id)}
              role="button"
              tabIndex={0}
            >
              <h2 className="section-title">{section.title}</h2>
              <ChevronDown 
                size={24} 
                className={`chevron ${expandedSections[section.id] ? 'expanded' : ''}`}
              />
            </div>

            <div className={`section-body ${expandedSections[section.id] ? 'expanded' : ''}`}>
              {section.content && <p className="section-intro">{section.content}</p>}
              
              {section.points && (
                <ul className="points-list">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="point-item">
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {section.subsections && section.subsections.map((subsection, idx) => (
                <div key={idx} className="subsection">
                  <h3 className="subsection-heading">{subsection.heading}</h3>
                  <p className="subsection-content">{subsection.content}</p>
                  {subsection.points && (
                    <ul className="points-list">
                      {subsection.points.map((point, pidx) => (
                        <li key={pidx} className="point-item">{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="privacy-footer-cta">
        <h3>Questions About Your Privacy?</h3>
        <p>We're here to help. Contact our privacy team at any time.</p>
        <a href="mailto:contact@oqulix.com" className="cta-button">
          Get in Touch
        </a>
        <p className="last-updated">Last updated: March 2026</p>
      </div>

      <style jsx>{`
        .privacy-policy-wrapper {
          background: linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Scroll progress bar */
        .scroll-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
          z-index: 1000;
          transition: width 0.1s ease-out;
        }

        /* Header */
        .privacy-header {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .privacy-header-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .privacy-title {
          font-size: 48px;
          font-weight: 700;
          margin: 0 0 12px 0;
          letter-spacing: -0.5px;
        }

        .privacy-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 16px 0;
          font-weight: 500;
        }

        .policy-meta {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .policy-meta strong {
          color: rgba(255, 255, 255, 0.9);
        }

        /* Table of Contents */
        .table-of-contents {
          background: white;
          max-width: 900px;
          margin: 40px auto;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .table-of-contents h2 {
          font-size: 20px;
          font-weight: 600;
          margin-top: 0;
          color: #1e293b;
        }

        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .toc-link {
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }

        .toc-link:before {
          content: '→';
          margin-right: 8px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .toc-link:hover {
          background: #f0f4ff;
          padding-left: 20px;
        }

        .toc-link:hover:before {
          opacity: 1;
        }

        /* Main content */
        .privacy-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px 60px;
        }

        .policy-section {
          background: white;
          margin-bottom: 24px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-header {
          padding: 24px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%);
          border-bottom: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .section-header:hover {
          background: linear-gradient(135deg, #f0f2f5 0%, #e8eef5 100%);
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
          flex: 1;
        }

        .chevron {
          flex-shrink: 0;
          color: #6366f1;
          transition: transform 0.3s ease;
        }

        .chevron.expanded {
          transform: rotate(180deg);
        }

        .section-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .section-body.expanded {
          max-height: 3000px;
          transition: max-height 0.4s ease-in;
        }

        .section-intro {
          padding: 24px 24px 0;
          color: #475569;
          line-height: 1.7;
          margin: 0;
          font-size: 15px;
        }

        .points-list {
          list-style: none;
          padding: 16px 24px 24px;
          margin: 0;
        }

        .point-item {
          color: #475569;
          line-height: 1.8;
          padding: 10px 0 10px 32px;
          position: relative;
          font-size: 15px;
        }

        .point-item:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: bold;
          font-size: 18px;
        }

        .subsection {
          padding: 0 24px;
        }

        .subsection-heading {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin: 20px 0 12px 0;
        }

        .subsection-content {
          color: #475569;
          line-height: 1.7;
          margin: 0 0 12px 0;
          font-size: 15px;
        }

        /* Footer CTA */
        .privacy-footer-cta {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          padding: 50px 20px;
          text-align: center;
          margin-top: 60px;
        }

        .privacy-footer-cta h3 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 12px 0;
        }

        .privacy-footer-cta p {
          font-size: 16px;
          margin: 0 0 24px 0;
          opacity: 0.95;
        }

        .cta-button {
          display: inline-block;
          padding: 14px 40px;
          background: white;
          color: #6366f1;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 16px;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .last-updated {
          margin: 24px 0 0 0;
          font-size: 13px;
          opacity: 0.8;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .privacy-title {
            font-size: 32px;
          }

          .privacy-subtitle {
            font-size: 16px;
          }

          .toc-list {
            grid-template-columns: 1fr;
          }

          .section-header {
            padding: 18px;
          }

          .section-title {
            font-size: 18px;
          }

          .privacy-footer-cta h3 {
            font-size: 24px;
          }

          .chevron {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;