export const INTAKES = [
  {
    id: "intake-2026-q2",
    season: "Quarter 2 2026",
    label: "Dry Season Cohort",
    status: "open",
    startDate: "April 4, 2026",
    endDate: "June 20, 2026",
    applicationDeadline: "March 21, 2026",
    capacity: 24,
    spotsLeft: 8,
    schedule: "Saturdays, 9:00 AM – 4:00 PM",
  },
  {
    id: "intake-2026-q3",
    season: "Quarter 3 2026",
    label: "Rain Season Cohort",
    status: "upcoming",
    startDate: "July 4, 2026",
    endDate: "September 19, 2026",
    applicationDeadline: "June 20, 2026",
    capacity: 24,
    spotsLeft: 24,
    schedule: "Saturdays, 9:00 AM – 4:00 PM",
  },
  {
    id: "intake-2026-q4",
    season: "Quarter 4 2026",
    label: "Harmattan Cohort",
    status: "upcoming",
    startDate: "October 3, 2026",
    endDate: "December 19, 2026",
    applicationDeadline: "September 19, 2026",
    capacity: 24,
    spotsLeft: 24,
    schedule: "Saturdays, 9:00 AM – 4:00 PM",
  },
]

export const MODULES = [
  {
    id: "mod-1",
    title: "Foundations of Performance",
    description:
      "Voice projection, body movement, stage presence, and the core techniques every actor must master.",
    duration: "4 weeks",
  },
  {
    id: "mod-2",
    title: "Script Analysis & Character Building",
    description:
      "Breaking down scripts, understanding subtext, and building layered, believable characters.",
    duration: "4 weeks",
  },
  {
    id: "mod-3",
    title: "African Storytelling & Oral Traditions",
    description:
      "Rooting performance in African narrative traditions — griot techniques, folklore adaptation, and indigenous voice.",
    duration: "3 weeks",
  },
  {
    id: "mod-4",
    title: "Screen Acting & Camera Techniques",
    description:
      "Hit your mark, hit your light, hit your emotion. Everything you need for film and TV.",
    duration: "3 weeks",
  },
  {
    id: "mod-5",
    title: "Monologue Preparation & Showcase",
    description:
      "Select, rehearse, and perform a showcase monologue. Culminates in a recorded performance for your portfolio.",
    duration: "2 weeks",
  },
]

export const TUITION = {
  amount: "NGN 150,000",
  whatIsCovered: [
    "All 16 weeks of training",
    "Printed course materials",
    "Access to rehearsal space during open hours",
    "Professional headshot session (Faces of the Story)",
    "End-of-program showcase recording",
    "Certificate of completion",
  ],
  paymentOptions: ["Pay in full (5% discount)", "2 installments (50/50)", "4 installments (25% each)"],
}

export const SCHOOLS_OUTREACH = {
  programmes: [
    {
      title: "ASA School Workshops",
      description:
        "Half-day and full-day workshops delivered on school premises. Covering drama basics, confidence building, and public speaking.",
      duration: "Half-day or full-day",
     适合: "Secondary schools (JSS1 – SSS3)",
    },
    {
      title: "After-School Drama Clubs",
      description:
        "A structured 12-week programme where students learn performance skills and put on an end-of-term showcase for parents and teachers.",
      duration: "12 weeks, 2 sessions per week",
     适合: "Schools with existing creative arts clubs",
    },
    {
      title: "Teacher Training in Drama Pedagogy",
      description:
        "Equipping teachers with tools to use drama techniques in their classrooms — across English, History, and Civic Education.",
      duration: "3-day intensive",
     适合: "Subject teachers & school administrators",
    },
  ],
}
