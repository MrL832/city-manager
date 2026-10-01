export const scenarios = [
  {
    id: 'wearable-tech',
    topic: 'Wearable Tech',
    label: 'Health Data',
    title: 'Launch a city health tracker connected to local hospitals',
    prompt:
      'The city can provide a free wearable app that tracks heart rate, activity, and sleep. Hospitals say sharing the data could help identify illness early, but residents worry about constant monitoring.',
    focus: 'Individual privacy vs public health planning',
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
          'Health data is special category personal data under UK GDPR, so the city would need a clear lawful basis, strong security, and transparent consent or public-interest justification.',
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
          'Opt-in consent and anonymisation reduce privacy risk, though the city must still explain data use clearly and prove the anonymisation cannot easily be reversed.',
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
          'Avoiding the system removes most data protection risk, yet the city still has a duty to consider whether safer health services could have been delivered responsibly.',
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
          'Liability may involve the operator, software developer, manufacturer, or insurer, so contracts and transport regulations must define responsibility before launch.',
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
          'Clear liability agreements, audit logs, and human override policies support compliance and make it easier to respond if an accident happens.',
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
          'Traditional liability is simpler because responsibility sits more clearly with drivers and operators rather than complex software supply chains.',
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
          'Computer Misuse laws support action against attackers, but internal monitoring still needs to be proportionate, authorised, and compliant with employment and data protection rules.',
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
          'Targeted logging, access controls, and documented incident handling are easier to justify as proportionate under data protection and cybersecurity expectations.',
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
          'Transparency may support public trust, yet the city could still face criticism or liability if it neglects reasonable technical protection measures.',
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
          'The city must use secure authentication, encryption, and data processing agreements with the cloud provider to meet UK GDPR responsibilities.',
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
          'Restricting access, using MFA, and auditing logins help demonstrate reasonable security measures under data protection law.',
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
          'The city still has the same duty to secure personal data; keeping data locally does not remove legal obligations around breaches or access control.',
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
          'Biometric data is highly sensitive, so the city would need a strong lawful basis, strict retention limits, and protection against misuse or discrimination.',
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
          'The city must ensure genuine choice, clear consent, secure storage, and equal access for people who refuse or cannot use biometrics.',
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
          'Rejecting biometrics removes many data protection risks, though the city must still use another secure and inclusive ticketing method.',
        environmental:
          'Avoiding a new biometric network cuts down on sensor manufacturing, camera deployment, and future electronic waste.',
        conflict:
          'Citizens keep stronger privacy protections, while transport leaders lose a tool they believe could improve safety and efficiency.',
      },
    ],
  },
]
