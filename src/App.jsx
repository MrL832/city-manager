import { useEffect, useMemo, useRef, useState } from 'react'
import { scenarios } from './data/scenarios'

const impactCardStyles = {
  Ethical: {
    badge: 'ET',
    border: 'border-rose-400/30',
    background: 'bg-rose-500/10',
    badgeStyle: 'bg-rose-300/20 text-rose-100',
    label: 'text-rose-200',
    prompt: 'Whose rights, freedom, or fairness are affected?',
  },
  Legal: {
    badge: 'LAW',
    border: 'border-sky-400/30',
    background: 'bg-sky-500/10',
    badgeStyle: 'bg-sky-300/20 text-sky-100',
    label: 'text-sky-200',
    prompt: 'Which UK rule applies, and what must the council do?',
  },
  Environmental: {
    badge: 'ENV',
    border: 'border-emerald-400/30',
    background: 'bg-emerald-500/10',
    badgeStyle: 'bg-emerald-300/20 text-emerald-100',
    label: 'text-emerald-200',
    prompt: 'What energy use, hardware waste, or emissions follow?',
  },
}

function ImpactCard({ title, body }) {
  const style = impactCardStyles[title]

  return (
    <article
      className={`rounded-3xl border p-5 shadow-lg shadow-slate-950/20 ${style.border} ${style.background}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={`text-xs uppercase tracking-[0.3em] ${style.label}`}>
            {title}
          </p>
          <h4 className="mt-2 text-xl font-semibold text-white">{title} impact</h4>
        </div>
        <span
          className={`inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-3 text-xs font-semibold uppercase tracking-[0.2em] ${style.badgeStyle}`}
        >
          {style.badge}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-100">{body}</p>
      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/30 p-3">
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
          Revision question
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-200">{style.prompt}</p>
      </div>
    </article>
  )
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [decisions, setDecisions] = useState({})
  const briefingRef = useRef(null)

  const currentScenario = scenarios[currentIndex]
  const activeDecision = decisions[currentScenario.id]
  const completedCount = Object.keys(decisions).length
  const allScenariosComplete = completedCount === scenarios.length

  const summary = useMemo(() => {
    const selectedChoices = scenarios
      .map((scenario) => decisions[scenario.id])
      .filter(Boolean)

    if (selectedChoices.length === 0) {
      return {
        score: 0,
        label: 'No policy direction selected yet',
        description:
          'Start making decisions to see how your city balances personal privacy against collective safety.',
      }
    }

    const score = selectedChoices.reduce(
      (total, choice) => total + choice.policyScore,
      0,
    )

    if (score >= 6) {
      return {
        score,
        label: 'Safety-first city',
        description:
          'Your decisions favour strong monitoring and intervention. This can improve protection, but it creates larger privacy risks.',
      }
    }

    if (score >= 2) {
      return {
        score,
        label: 'Managed security city',
        description:
          'Your decisions usually prioritise public safety, while still keeping some limits on digital control.',
      }
    }

    if (score <= -6) {
      return {
        score,
        label: 'Privacy-first city',
        description:
          'Your decisions strongly defend civil liberties and personal data, even when that can reduce oversight or system efficiency.',
      }
    }

    if (score <= -2) {
      return {
        score,
        label: 'Rights-focused city',
        description:
          'Your choices often protect individual control, but they may also reduce the speed or reach of public safety systems.',
      }
    }

    return {
      score,
      label: 'Balanced city',
      description:
        'Your approach accepts that digital technology creates trade-offs, so you usually look for safeguards rather than one extreme.',
    }
  }, [decisions])

  const completedScenarioReviews = useMemo(
    () =>
      scenarios
        .map((scenario) => ({
          scenario,
          decision: decisions[scenario.id],
        }))
        .filter((item) => item.decision),
    [decisions],
  )

  const examSentenceStarters = useMemo(() => {
    if (!activeDecision) {
      return []
    }

    return [
      `One ethical issue is that ${activeDecision.ethical.toLowerCase()}`,
      `However, supporters would argue that ${activeDecision.conflict.toLowerCase()}`,
      `Legally, this links to ${currentScenario.lawSpotlight.title} because ${activeDecision.legal.toLowerCase()}`,
      'Overall, a balanced policy would try to protect the public while limiting unnecessary data collection and monitoring.',
    ]
  }, [activeDecision, currentScenario.lawSpotlight.title])

  const finalReview = useMemo(() => {
    if (!allScenariosComplete) {
      return null
    }

    const safetyCount = completedScenarioReviews.filter(
      ({ decision }) => decision.policyScore > 0,
    ).length
    const privacyCount = completedScenarioReviews.filter(
      ({ decision }) => decision.policyScore < 0,
    ).length
    const balanceCount = completedScenarioReviews.filter(
      ({ decision }) => decision.policyScore === 0,
    ).length

    return {
      counts: {
        safety: safetyCount,
        privacy: privacyCount,
        balance: balanceCount,
      },
      paragraph: `Across all five scenarios, your city ends up as a ${summary.label.toLowerCase()}. You chose ${safetyCount} option${safetyCount === 1 ? '' : 's'} that leaned toward safety, ${privacyCount} that leaned toward privacy, and ${balanceCount} that tried to balance both sides. This is useful in the exam because it proves that digital technology decisions are rarely fully right or fully wrong: they depend on how much risk, surveillance, and control a society is willing to accept.`,
      answerBullets: [
        `Your strongest overall theme is ${summary.label.toLowerCase()}, which shows a clear judgement rather than a list of separate points.`,
        'The main legal pattern is that UK GDPR and the Data Protection Act 2018 appear whenever personal or biometric data is collected, stored, or shared.',
        'The Computer Misuse Act 1990 becomes most important when hacking, unauthorised access, malware, or disruption of systems is involved.',
        'A strong final judgement should mention benefits for safety or efficiency, then explain the privacy, fairness, or environmental cost.',
      ],
      modelParagraph: [
        `Overall, my city follows a ${summary.label.toLowerCase()} approach to digital technology.`,
        `In the simulator, I sometimes supported security measures because smart systems can improve safety, speed, and access to services.`,
        'However, many of these systems also reduce privacy because they collect personal, health, or biometric data and may increase surveillance.',
        'Legally, this links to the Data Protection Act 2018 and UK GDPR when personal data is processed, while the Computer Misuse Act 1990 is relevant when systems are hacked or accessed without permission.',
        'Therefore, the best answer is not simply to support or reject technology, but to explain the trade-off and suggest safeguards such as consent, limited data collection, and strong security.',
      ],
    }
  }, [allScenariosComplete, completedScenarioReviews, summary.label])

  useEffect(() => {
    if (
      activeDecision &&
      briefingRef.current &&
      typeof window !== 'undefined' &&
      window.innerWidth < 1024
    ) {
      briefingRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [activeDecision, currentScenario.id])

  const handleDecision = (choice) => {
    setDecisions((previous) => ({
      ...previous,
      [currentScenario.id]: choice,
    }))
  }

  const jumpToScenario = (index) => {
    setCurrentIndex(index)
  }

  const goToNextScenario = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((index) => index + 1)
    }
  }

  const resetSimulation = () => {
    setCurrentIndex(0)
    setDecisions({})
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:sticky lg:top-6 lg:h-fit lg:w-80">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                Ethics & Impact Simulator
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                  City Manager Dashboard
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                  Build a smart city policy and defend the trade-offs
                </h1>
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Each decision shows why digital technology is rarely simply
                good or bad. Your job is to weigh privacy, security, law, and
                sustainability together.
              </p>
            </div>

            <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Scenario progress</span>
                <span>
                  {completedCount}/{scenarios.length}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 transition-all duration-500"
                  style={{ width: `${(completedCount / scenarios.length) * 100}%` }}
                />
              </div>
              <div className="mt-4 space-y-2">
                {scenarios.map((scenario, index) => {
                  const decision = decisions[scenario.id]
                  const isCurrent = index === currentIndex

                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => jumpToScenario(index)}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                        isCurrent
                          ? 'border-cyan-400/50 bg-cyan-400/10 shadow-lg shadow-cyan-500/5'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold ${
                          decision
                            ? 'border-emerald-400/30 bg-emerald-400/15 text-emerald-200'
                            : isCurrent
                              ? 'border-cyan-400/40 bg-cyan-300/10 text-cyan-100'
                              : 'border-white/10 bg-slate-900/60 text-slate-300'
                        }`}
                      >
                        {decision ? 'OK' : index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                          {scenario.label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-white">
                          {scenario.topic}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {decision ? decision.stanceLabel : 'Choose a city policy'}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                          decision
                            ? 'bg-emerald-400/15 text-emerald-200'
                            : isCurrent
                              ? 'bg-cyan-400/15 text-cyan-100'
                              : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {decision ? 'Done' : isCurrent ? 'Live' : 'Pending'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-violet-200/80">
                    Privacy vs Safety Meter
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-white">
                    {summary.label}
                  </h2>
                </div>
                <div className="rounded-2xl bg-slate-950/60 px-3 py-2 text-right">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                    Score
                  </p>
                  <p className="text-xl font-semibold text-white">
                    {summary.score > 0 ? `+${summary.score}` : summary.score}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                {summary.description}
              </p>
            </section>

            <section className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-sky-200/90">
                UK Law Quick Guide
              </p>
              <div className="mt-3 space-y-3 text-sm leading-6 text-slate-200">
                <p>
                  <span className="font-semibold text-white">
                    Computer Misuse Act 1990:
                  </span>{' '}
                  makes hacking illegal, including unauthorised access to
                  systems and actions that impair or disrupt them.
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Data Protection Act 2018 and UK GDPR:
                  </span>{' '}
                  control how organisations in the UK collect, use, store, and
                  secure personal data.
                </p>
              </div>
            </section>

            <button
              type="button"
              onClick={resetSimulation}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10"
            >
              Reset simulation
            </button>
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-slate-950/50 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">
                  Scenario {currentIndex + 1}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {currentScenario.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                  {currentScenario.prompt}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Main conflict
                </p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-200">
                  {currentScenario.focus}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {currentScenario.choices.map((choice) => {
              const isSelected = activeDecision?.id === choice.id

              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleDecision(choice)}
                  className={`rounded-3xl border p-5 text-left transition duration-200 ${
                    isSelected
                      ? 'border-cyan-400/60 bg-cyan-400/10 shadow-lg shadow-cyan-500/10'
                      : 'border-white/10 bg-white/5 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-lg font-semibold text-white">
                      {choice.title}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        isSelected
                          ? 'bg-cyan-300/20 text-cyan-100'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {choice.policyScore > 0
                        ? 'Safety'
                        : choice.policyScore < 0
                          ? 'Privacy'
                          : 'Balance'}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {choice.summary}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                      {choice.stanceLabel}
                    </p>
                    {isSelected && (
                      <span className="rounded-full border border-cyan-300/30 bg-cyan-300/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100">
                        Selected
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          <section
            ref={briefingRef}
            className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 sm:p-8"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
                  Briefing
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {activeDecision
                    ? 'Understand the consequences of your decision'
                    : 'Choose an option to unlock the impact cards'}
                </h3>
              </div>
              {activeDecision && (
                <button
                  type="button"
                  onClick={goToNextScenario}
                  disabled={currentIndex === scenarios.length - 1}
                  className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                >
                  {currentIndex === scenarios.length - 1
                    ? 'Final scenario reached'
                    : 'Save choice and continue'}
                </button>
              )}
            </div>

            {activeDecision ? (
              <div className="mt-6 space-y-6">
                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/80">
                        Selected city policy
                      </p>
                      <h4 className="mt-2 text-2xl font-semibold text-white">
                        {activeDecision.title}
                      </h4>
                      <p className="mt-3 text-sm leading-6 text-slate-100">
                        {activeDecision.summary}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-cyan-300/30 bg-cyan-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                        {activeDecision.stanceLabel}
                      </span>
                      <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                        {activeDecision.policyScore > 0
                          ? 'Leans toward safety'
                          : activeDecision.policyScore < 0
                            ? 'Leans toward privacy'
                            : 'Balanced position'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-100/80">
                    Conflict summary
                  </p>
                  <p className="mt-2 text-sm leading-6 text-amber-50">
                    {activeDecision.conflict}
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  <ImpactCard title="Ethical" body={activeDecision.ethical} />
                  <ImpactCard title="Legal" body={activeDecision.legal} />
                  <ImpactCard
                    title="Environmental"
                    body={activeDecision.environmental}
                  />
                </div>

                <div className="rounded-3xl border border-indigo-400/20 bg-indigo-500/10 p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">
                        UK Law Spotlight
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-white">
                        {currentScenario.lawSpotlight.title}
                      </h4>
                    </div>
                    <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                      Specific law detail
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    {currentScenario.lawSpotlight.examTip}
                  </p>
                  <div className="mt-5 grid gap-3 lg:grid-cols-3">
                    {currentScenario.lawSpotlight.items.map((item) => (
                      <article
                        key={item.law}
                        className="rounded-2xl border border-white/10 bg-slate-950/30 p-4"
                      >
                        <p className="text-sm font-semibold text-white">
                          {item.law}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {item.detail}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>

                <details className="rounded-3xl border border-cyan-400/20 bg-slate-950/40 p-5 group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                        Exam answer helper
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-white">
                        Turn this decision into a GCSE paragraph
                      </h4>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300 transition group-open:bg-cyan-300/15 group-open:text-cyan-100">
                      Open
                    </span>
                  </summary>
                  <div className="mt-5 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        Sentence starters
                      </p>
                      <div className="mt-3 space-y-3">
                        {examSentenceStarters.map((starter) => (
                          <p
                            key={starter}
                            className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-3 text-sm leading-6 text-slate-200"
                          >
                            {starter}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        Key terms to include
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs text-slate-200">
                          {currentScenario.topic}
                        </span>
                        <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs text-slate-200">
                          {currentScenario.lawSpotlight.title}
                        </span>
                        {currentScenario.lawSpotlight.items.map((item) => (
                          <span
                            key={item.law}
                            className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs text-slate-200"
                          >
                            {item.law}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/80">
                          Exam structure
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-200">
                          Point, explain the benefit, explain the risk, name the
                          UK law, then finish with a balanced judgement.
                        </p>
                      </div>
                    </div>
                  </div>
                </details>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Exam thinking point
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    AQA-style answers score well when they explain both sides:
                    who benefits from the technology, who takes the risk, and
                    what safeguards could reduce harm.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-400">
                Pick one of the policy options above. The impact cards will then
                explain the ethical conflict, the relevant law, and the
                environmental cost.
              </div>
            )}
          </section>

          {allScenariosComplete && finalReview && (
            <section className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6 sm:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
                    Compare Your Answers
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">
                    Your city policy is complete
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-emerald-50">
                    {finalReview.paragraph}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:min-w-80">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-center">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                      Safety
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {finalReview.counts.safety}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-center">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                      Balance
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {finalReview.counts.balance}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-center">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                      Privacy
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {finalReview.counts.privacy}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                {completedScenarioReviews.map(({ scenario, decision }, index) => (
                  <article
                    key={scenario.id}
                    className="rounded-3xl border border-white/10 bg-slate-950/35 p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                          Scenario {index + 1}
                        </p>
                        <h4 className="mt-2 text-lg font-semibold text-white">
                          {scenario.topic}
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-slate-200">
                          {decision.title}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => jumpToScenario(index)}
                        className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                      >
                        Review
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-100">
                        {decision.stanceLabel}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-100">
                        {scenario.lawSpotlight.title}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {decision.conflict}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_1.15fr]">
                <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">
                    Revision Summary
                  </p>
                  <div className="mt-4 space-y-3">
                    {finalReview.answerBullets.map((bullet) => (
                      <p
                        key={bullet}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-200"
                      >
                        {bullet}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                    Model Final Paragraph
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-white">
                    Use this as a full-answer scaffold
                  </h4>
                  <div className="mt-4 space-y-3">
                    {finalReview.modelParagraph.map((line) => (
                      <p
                        key={line}
                        className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm leading-6 text-slate-100"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
