import { useState } from "react"
import { motion } from "motion/react"
import { CheckCircle, ArrowLeft, Send, AlertCircle } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { createApplication } from "../../data/applicationData"
import Button from "../../components/ui/Button"

const schema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  location: Yup.string().required("Location is required"),
  experience: Yup.string().required("Please tell us about your experience"),
  skills: Yup.string().required("Please list your skills"),
  whyJoin: Yup.string().required("Tell us why you want to join").min(20, "Please provide at least 20 characters"),
  headshotUrl: Yup.string().url("Must be a valid URL"),
})

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  location: "",
  experience: "",
  skills: "",
  whyJoin: "",
  headshotUrl: "",
}

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-asa-background">
      {/* Gold top rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-asa-primary/30 to-transparent" />

      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center card-ticket p-12"
          >
            <CheckCircle className="mx-auto h-16 w-16 text-asa-success" />
            <h1 className="mt-6 font-headline text-3xl font-bold text-asa-text">Application Submitted</h1>
            <p className="mt-4 text-asa-muted max-w-md mx-auto">
              Thank you for applying to Actor&apos;s Slot Academy. We&apos;ll review your application and get back to
              you within 5&ndash;7 business days.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-asa-primary px-6 py-3 text-sm font-semibold text-asa-background hover:bg-asa-primary-bright transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>
        ) : (
          <>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-asa-muted hover:text-asa-text transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-headline text-4xl font-bold text-asa-text sm:text-5xl">Apply Now</h1>
              <p className="mt-3 text-asa-muted max-w-xl">
                Take the first step toward your professional acting career. Fill out the form below and
                we&apos;ll be in touch.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-ticket mt-10 rounded-xl border border-asa-border bg-asa-surface p-8"
            >
              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                  createApplication(values)
                  setSubmitted(true)
                  setSubmitting(false)
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FieldGroup label="Full Name" name="fullName" placeholder="Your full name" />
                      <FieldGroup label="Email" name="email" type="email" placeholder="you@example.com" />
                      <FieldGroup label="Phone" name="phone" placeholder="+256-700-000-000" />
                      <FieldGroup label="Date of Birth" name="dateOfBirth" type="date" />
                      <FieldGroup label="Location" name="location" placeholder="City, Country" className="sm:col-span-2" />
                    </div>

                    <FieldGroup label="Experience" name="experience" as="textarea" placeholder="Describe your acting or performance experience..." className="sm:col-span-2" />
                    <FieldGroup label="Skills" name="skills" as="textarea" placeholder="Voice, movement, improvisation, etc." />
                    <FieldGroup label="Why Do You Want to Join?" name="whyJoin" as="textarea" placeholder="Tell us your story and what drives you..." />
                    <FieldGroup label="Headshot URL (optional)" name="headshotUrl" placeholder="https://..." />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <Send className="h-4 w-4" />
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

function FieldGroup({ label, name, type = "text", placeholder, as, className }) {
  const Component = as === "textarea" ? "textarea" : "input"
  return (
    <div className={className}>
      <label htmlFor={name} className="label-mono mb-2 block text-xs">
        {label}
      </label>
      <Field
        as={as}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="w-full rounded-lg border border-asa-border bg-asa-surface px-4 py-3 text-sm text-asa-text placeholder:text-asa-muted/50 focus:border-asa-primary focus:outline-none transition-colors"
        rows={as === "textarea" ? 3 : undefined}
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <p className="mt-1 flex items-center gap-1 text-xs text-asa-accent">
            <AlertCircle className="h-3 w-3" />
            {msg}
          </p>
        )}
      </ErrorMessage>
    </div>
  )
}
