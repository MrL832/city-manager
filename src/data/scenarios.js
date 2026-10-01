export const scenarios = [
  {
    id: 'wearable-tech',
    topic: 'Wearable Tech',
    label: 'Health Data',
    title: 'Launch a city health tracker connected to local hospitals',
    prompt:
      'The city can provide a free wearable app that tracks heart rate, activity, and sleep. Hospitals say sharing the data could help identify illness early, but residents worry about constant monitoring.',
    focus: 'Individual privacy vs public health planning',
    lawSpotlight: {
      title: 'Data Protection Act 2018 and UK GDPR',
      examTip:
        'In an exam, name both the Data Protection Act 2018 and UK GDPR, then explain the rule being applied to the data.',
      items: [
        {
          law: 'Special category data',
          detail:
            'Health information is special category personal data, so the council and hospitals need an extra lawful condition for processing it, not just a general reason.',
        },
        {
          law: 'Lawful basis and transparency',
          detail:
            'The city must tell citizens what is collected, why it is shared, how long it is kept, and who receives it. This links to fairness, lawfulness, and transparency under UK GDPR.',
        },
        {
          law: 'Data minimisation',
          detail:
            'Only the data genuinely needed for treatment or planning should be collected. Gathering constant location or lifestyle data without clear need could break the principle of data minimisation.',
        },
      ],
    },
    choices: [
      {
        id: 'wearable-full-share',
        title: 'Share all identifiable data with hospitals',
        summary:
          'Hospitals get richer data for rapid treatment, but citizens lose control over sensitive medical information.',
        policyScore: 2,
        stanceLabel: 'Leans toward security and safety',
        ethical:
          'This improves care and could save lives, yet it weakens personal autonomy because people may feel pressured to give up private health details.',
        legal:
          'Health data is special category personal data under the Data Protection Act 2018 and UK GDPR, so the city needs a lawful basis, an extra condition for using health data, clear privacy notices, and strong security controls before identifiable records are shared.',
        environmental:
          'Continuous syncing from thousands of devices increases energy use in mobile networks, cloud servers, and device manufacturing, adding to long-term e-waste.',
        conflict:
          'Health services argue detailed data helps prevent emergencies, while citizens value the right to keep their bodies and habits private.',
      },
      {
        id: 'wearable-anon-opt-in',
        title: 'Use anonymised, opt-in data only',
        summary:
          'The city still learns useful health trends, but hospitals receive less detailed information for individual intervention.',
        policyScore: 0,
        stanceLabel: 'Attempts a balance',
        ethical:
          'An opt-in model respects informed choice and reduces pressure on citizens, but it may limit the usefulness of the system for those needing urgent support.',
        legal:
          'Opt-in consent is easier to justify under UK GDPR, but the council must prove consent is freely given and informed. If it claims data is anonymous, the data must not be easily re-identified, otherwise the Data Protection Act 2018 still applies.',
        environmental:
          'Collecting fewer data points lowers processing demand, but the wearables still need batteries, charging, and eventual disposal.',
        conflict:
          'Privacy campaigners prefer voluntary participation, while health planners worry that missing data makes the system less effective.',
      },
      {
        id: 'wearable-no-rollout',
        title: 'Do not roll it out citywide',
        summary:
          'Residents keep their privacy, but the city misses a chance to use digital technology for preventative healthcare.',
        policyScore: -2,
        stanceLabel: 'Leans toward individual privacy',
        ethical:
          'Refusing the rollout protects personal freedom and avoids surveillance creep, but it may leave vulnerable people without a potentially helpful service.',
        legal:
          'Avoiding the rollout removes much of the risk of mishandling special category data under the Data Protection Act 2018 and UK GDPR, although the council could still offer smaller voluntary systems with proper consent and safeguards.',
        environmental:
          'Not deploying the system avoids the extra energy demand and hardware turnover created by a city-scale wearable ecosystem.',
        conflict:
          'Citizens keep stronger control over private data, while medical teams lose a tool they believe could improve safety.',
      },
    ],
  },
  {
    id: 'autonomous-vehicles',
    topic: 'Autonomous Vehicles',
    label: 'Liability',
    title: 'Introduce self-driving buses into public transport',
    prompt:
      'Autonomous buses promise fewer human driving errors and better traffic flow. However, if one crashes, the city must decide where liability sits and how much real-time journey data should be collected.',
    focus: 'Efficiency and safety vs accountability and oversight',
    lawSpotlight: {
      title: 'UK GDPR, Data Protection Act 2018, and liability rules',
      examTip:
        'This topic is not mainly about the Computer Misuse Act, but journey logs and passenger monitoring still bring UK data protection law into the answer.',
      items: [
        {
          law: 'Personal data from sensors',
          detail:
            'If cameras, GPS logs, or passenger accounts can identify a person, the records count as personal data and must be processed fairly under the Data Protection Act 2018 and UK GDPR.',
        },
        {
          law: 'Purpose limitation',
          detail:
            'The city should collect travel and safety data for clear reasons such as accident review or maintenance, not reuse it for unrelated monitoring without a lawful basis.',
        },
        {
          law: 'Accountability',
          detail:
            'The council must be able to show who is responsible for the AI system, the data, and any accident investigation. AQA answers often gain marks by naming responsibility clearly.',
        },
      ],
    },
    choices: [
      {
        id: 'av-fast-rollout',
        title: 'Deploy quickly with extensive monitoring',
        summary:
          'The city gains fast innovation and rich evidence after accidents, but passengers are heavily tracked and liability stays unclear.',
        policyScore: 2,
        stanceLabel: 'Leans toward security and safety',
        ethical:
          'Using detailed monitoring may improve safety investigations, yet it can normalise surveillance and shift important decisions away from human judgment.',
        legal:
          'Liability may involve the operator, manufacturer, software developer, or insurer, while passenger camera and location records must still follow the Data Protection Act 2018 and UK GDPR if people can be identified.',
        environmental:
          'Autonomous fleets can reduce congestion and fuel waste if routes are efficient, but they also require energy-intensive sensors, data centres, and replacement electronics.',
        conflict:
          'Transport officials want safer, data-driven roads, while passengers may object to constant tracking and unclear accountability if an AI system fails.',
      },
      {
        id: 'av-phased-pilot',
        title: 'Run a small pilot with clear liability rules',
        summary:
          'Innovation continues more slowly, but the city tests safety and legal responsibility before scaling up.',
        policyScore: 0,
        stanceLabel: 'Attempts a balance',
        ethical:
          'A pilot limits harm and shows caution, though it may delay potential benefits such as fewer collisions and better accessibility.',
        legal:
          'Clear liability agreements, audit logs, and human override policies improve accountability, while limited data collection helps the city follow UK GDPR principles such as purpose limitation and data minimisation.',
        environmental:
          'A pilot reduces immediate hardware waste and energy use compared with a full rollout, while still requiring specialist equipment and charging infrastructure.',
        conflict:
          'Safety advocates prefer gradual testing, while innovation supporters argue that slow adoption delays benefits for the whole city.',
      },
      {
        id: 'av-keep-human-drivers',
        title: 'Keep human-driven transit only',
        summary:
          'The city avoids new AI risks, but it also gives up possible efficiency and road-safety gains.',
        policyScore: -1,
        stanceLabel: 'Leans toward individual rights and caution',
        ethical:
          'Keeping humans in control preserves accountability and public trust, but it may ignore a technology that could eventually reduce harm.',
        legal:
          'Traditional liability is simpler because responsibility sits more clearly with drivers and operators, and the city avoids building large new stores of passenger tracking data that would need to comply with UK GDPR.',
        environmental:
          'The city avoids manufacturing new smart fleets, but it may miss route-optimisation benefits that could lower emissions over time.',
        conflict:
          'Citizens may trust human accountability more, while city planners argue carefully governed automation could improve safety.',
      },
    ],
  },
  {
    id: 'cyber-security',
    topic: 'Cyber Security & Hacking',
    label: 'Critical Systems',
    title: 'Respond to an unauthorised access attempt on the water system',
    prompt:
      'Security analysts detect suspicious activity in the digital controls for the city water supply. They want emergency powers to monitor staff devices and network traffic to stop a possible attack immediately.',
    focus: 'Critical infrastructure protection vs employee privacy',
    lawSpotlight: {
      title: 'Computer Misuse Act 1990 and Data Protection Act 2018',
      examTip:
        'For hacking questions, name the Computer Misuse Act 1990 directly and, if staff or citizen data is involved, connect it to the Data Protection Act 2018 too.',
      items: [
        {
          law: 'Computer Misuse Act section 1',
          detail:
            'Unauthorised access to computer material is an offence. Trying to log into the water control system without permission can already break section 1, even before damage is done.',
        },
        {
          law: 'Computer Misuse Act section 3',
          detail:
            'Unauthorised acts intended to impair a computer, such as installing malware, changing settings, or disrupting a control system, can be prosecuted under section 3.',
        },
        {
          law: 'Computer Misuse Act section 3ZA',
          detail:
            'If a cyberattack causes, or risks causing, serious damage to human welfare, the attacker can face much more serious consequences. A water system attack fits this idea because it could threaten public health.',
        },
        {
          law: 'Data Protection Act 2018 and UK GDPR',
          detail:
            'When the council monitors staff devices or logs network activity, it must still be proportionate, secure, and justified. Collecting employee data does not become law-free just because there is a cyber incident.',
        },
      ],
    },
    choices: [
      {
        id: 'cyber-lockdown',
        title: 'Approve emergency monitoring and a full lockdown',
        summary:
          'The city maximises immediate protection, but staff privacy and workplace trust are reduced during the investigation.',
        policyScore: 2,
        stanceLabel: 'Strongly prioritises safety',
        ethical:
          'Protecting clean water is a high-stakes duty, yet broad surveillance can treat all staff as suspects and undermine fairness.',
        legal:
          'The suspected attacker may be committing offences under the Computer Misuse Act 1990, especially section 1 for unauthorised access and section 3 if the system is impaired. At the same time, emergency staff monitoring must remain proportionate under the Data Protection Act 2018 and UK GDPR.',
        environmental:
          'Emergency incident response often means extra servers, logging, and backup systems running continuously, increasing short-term energy consumption.',
        conflict:
          'Security teams argue rapid monitoring is essential to stop real-world harm, while employees expect privacy and proportionate treatment.',
      },
      {
        id: 'cyber-targeted-response',
        title: 'Use targeted monitoring and isolate affected systems',
        summary:
          'The response focuses on the most likely threat points, but some risk remains if the attacker is already elsewhere in the network.',
        policyScore: 0,
        stanceLabel: 'Attempts a balance',
        ethical:
          'This approach respects privacy more than blanket surveillance while still recognising the duty to protect essential services.',
        legal:
          'Targeted logging is easier to justify as proportionate under the Data Protection Act 2018 and UK GDPR, while evidence of the intrusion can support prosecution under the Computer Misuse Act 1990.',
        environmental:
          'Restricting monitoring to critical systems lowers the extra processing load compared with citywide emergency surveillance.',
        conflict:
          'Privacy-minded leaders prefer limited monitoring, while some security experts worry a narrower response could miss hidden threats.',
      },
      {
        id: 'cyber-public-disclosure',
        title: 'Pause monitoring and focus on public transparency',
        summary:
          'The city protects civil liberties, but it risks reacting too slowly if the attack is still active.',
        policyScore: -2,
        stanceLabel: 'Strongly prioritises privacy',
        ethical:
          'Open communication respects democratic accountability, but failing to act decisively could expose citizens to serious safety risks.',
        legal:
          'Transparency may support trust, but the city could still be criticised if it fails to respond to possible offences under the Computer Misuse Act 1990 or neglects reasonable steps to protect systems and any personal data they contain.',
        environmental:
          'Using fewer emergency systems reduces additional energy use, but a successful cyberattack could damage physical infrastructure and create wider environmental waste.',
        conflict:
          'Civil liberties groups value restraint and openness, while security services argue that delaying active monitoring puts public safety first in danger.',
      },
    ],
  },
  {
    id: 'cloud-storage',
    topic: 'Cloud Storage & Wireless Networking',
    label: 'Access',
    title: 'Move all city records to the cloud over public Wi-Fi access points',
    prompt:
      'The council wants staff to access cloud-based records from anywhere, including public Wi-Fi in libraries and transport hubs. This could make services faster, but opens questions about encryption, hacking, and who controls the data.',
    focus: 'Convenience and availability vs data exposure',
    lawSpotlight: {
      title: 'Data Protection Act 2018 and UK GDPR',
      examTip:
        'Cloud storage answers should go beyond saying GDPR exists. Explain what the council must actually do with security, access, and breaches.',
      items: [
        {
          law: 'Security principle',
          detail:
            'The council must keep personal data secure with measures such as encryption, strong passwords, MFA, and restricted access. Public Wi-Fi increases the need for these safeguards.',
        },
        {
          law: 'Controller and processor roles',
          detail:
            'The council is likely the data controller and the cloud company is often the processor. The controller remains responsible for making sure the processor handles data lawfully.',
        },
        {
          law: 'Breach reporting',
          detail:
            'If personal data is exposed, serious breaches may need to be reported to the ICO within 72 hours under UK GDPR rules.',
        },
      ],
    },
    choices: [
      {
        id: 'cloud-open-access',
        title: 'Allow access on any public Wi-Fi for flexibility',
        summary:
          'Staff can work from almost anywhere, but the attack surface grows and records become more exposed to interception or insecure devices.',
        policyScore: 1,
        stanceLabel: 'Leans toward access and operational convenience',
        ethical:
          'Flexible access can improve services for citizens, but it risks treating convenience as more important than protecting sensitive personal records.',
        legal:
          'The council must follow the Data Protection Act 2018 and UK GDPR by using encryption, strong authentication, access controls, and a proper contract with the cloud provider as processor. If records are breached, ICO reporting duties may apply.',
        environmental:
          'Cloud services can reduce on-site hardware duplication, but large data centres and network traffic still consume significant electricity and cooling resources.',
        conflict:
          'Managers value fast access to records, while citizens expect the council to protect their information even when staff work remotely.',
      },
      {
        id: 'cloud-secure-vpn',
        title: 'Use cloud storage with VPN and restricted networks',
        summary:
          'The system stays flexible, but access is tighter and staff may find the workflow slower.',
        policyScore: 0,
        stanceLabel: 'Attempts a balance',
        ethical:
          'This recognises that digital services should be efficient without ignoring the city’s duty to protect people from avoidable data misuse.',
        legal:
          'Restricting access, using MFA, and auditing logins help show compliance with the security principle in the Data Protection Act 2018 and UK GDPR, especially when staff may connect through less secure networks.',
        environmental:
          'A well-managed cloud setup may be more energy efficient than many local servers, though security layers add some extra processing.',
        conflict:
          'IT teams want safe access controls, while some staff argue too many restrictions make public services less responsive.',
      },
      {
        id: 'cloud-local-only',
        title: 'Keep records on local council servers only',
        summary:
          'Data stays under tighter local control, but the city loses some resilience and convenience offered by the cloud.',
        policyScore: -1,
        stanceLabel: 'Leans toward privacy and direct control',
        ethical:
          'Local control may reassure citizens, but older systems can also fail or become less accessible if the council underinvests in security.',
        legal:
          'Keeping data locally does not remove legal duties under the Data Protection Act 2018 and UK GDPR. The council still needs secure access control, backups, lawful processing, and breach reporting where required.',
        environmental:
          'Older local servers may be less energy efficient than modern cloud infrastructure, especially if multiple sites duplicate storage and backups.',
        conflict:
          'Some leaders trust local storage more, while others argue reputable cloud systems can offer stronger security and resilience.',
      },
    ],
  },
  {
    id: 'biometrics',
    topic: 'Biometrics & Implants',
    label: 'Identity',
    title: 'Adopt facial recognition or chip-based public transport access',
    prompt:
      'The city can speed up transport by using facial recognition gates or optional under-the-skin travel chips. Supporters say it cuts fraud and queues, but critics warn that body-linked ID systems are intrusive.',
    focus: 'Frictionless security vs bodily privacy and consent',
    lawSpotlight: {
      title: 'Data Protection Act 2018 and UK GDPR for biometric data',
      examTip:
        'Facial recognition is a strong GCSE example of sensitive data. State that biometric identifiers are especially protected in UK law.',
      items: [
        {
          law: 'Biometric data is sensitive',
          detail:
            'Faceprints and similar identifiers can count as special category personal data when used to uniquely identify someone, so stronger legal protection applies.',
        },
        {
          law: 'Consent and genuine choice',
          detail:
            'If the city says biometrics are optional, there must be a real alternative. Consent is weak if people are effectively forced to use the system to travel.',
        },
        {
          law: 'Accuracy and fairness',
          detail:
            'The Data Protection Act 2018 and UK GDPR require personal data to be accurate where appropriate. If facial recognition makes mistakes or disadvantages some groups, the system raises fairness concerns as well as privacy issues.',
        },
      ],
    },
    choices: [
      {
        id: 'biometric-mandatory',
        title: 'Make biometric access the default system',
        summary:
          'Travel becomes faster and fraud checks improve, but residents may feel they must surrender body-linked data to move around the city.',
        policyScore: 2,
        stanceLabel: 'Leans toward security and control',
        ethical:
          'Biometric systems can improve convenience and security, yet mandatory use can undermine consent and create a chilling effect on everyday freedom.',
        legal:
          'Biometric identifiers are highly sensitive under the Data Protection Act 2018 and UK GDPR, so the city would need a strong lawful basis, extra protection for special category data, strict retention limits, and safeguards against misuse or bias.',
        environmental:
          'Facial recognition cameras, scanners, and secure databases increase electricity use, while new devices and replacement parts contribute to e-waste.',
        conflict:
          'Security services and transport managers want faster, fraud-resistant access, while citizens worry about permanent identity tracking.',
      },
      {
        id: 'biometric-optional',
        title: 'Offer biometrics as an optional fast lane',
        summary:
          'Passengers can choose convenience, while others keep traditional tickets or cards.',
        policyScore: 0,
        stanceLabel: 'Attempts a balance',
        ethical:
          'Optional participation respects consent better, although social pressure may still push people toward giving up private data for convenience.',
        legal:
          'The city must ensure genuine choice, clear consent, secure storage, and equal access for people who refuse or cannot use biometrics, otherwise the supposed consent may not satisfy UK GDPR standards.',
        environmental:
          'Running two systems uses more equipment overall, but it avoids forcing every citizen into new hardware or implants.',
        conflict:
          'Officials can still test modern identity tools, while residents retain a clearer right to refuse intrusive technology.',
      },
      {
        id: 'biometric-ban',
        title: 'Reject biometric and implant access entirely',
        summary:
          'The city protects bodily privacy strongly, but it misses potential security and speed advantages.',
        policyScore: -2,
        stanceLabel: 'Strongly prioritises privacy',
        ethical:
          'This avoids linking identity to the body and reduces the risk of exclusion or discrimination caused by recognition errors.',
        legal:
          'Rejecting biometrics removes many of the risks tied to special category personal data under the Data Protection Act 2018 and UK GDPR, though the city still needs a secure and inclusive alternative ticketing system.',
        environmental:
          'Avoiding a new biometric network cuts down on sensor manufacturing, camera deployment, and future electronic waste.',
        conflict:
          'Citizens keep stronger privacy protections, while transport leaders lose a tool they believe could improve safety and efficiency.',
      },
    ],
  },
]
