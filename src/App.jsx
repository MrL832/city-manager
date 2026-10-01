import { useMemo, useState } from 'react'
import { scenarios } from './data/scenarios'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [decisions, setDecisions] = useState({})

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

                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => jumpToScenario(index)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left transition ${
                        index === currentIndex
                          ? 'border-cyan-400/50 bg-cyan-400/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                          {scenario.label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-white">
                          {scenario.topic}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          decision
                            ? 'bg-emerald-400/15 text-emerald-200'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {decision ? 'Briefed' : 'Pending'}
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
                  <p className="mt-4 text-xs uppercase tracking-[0.25em] text-slate-400">
                    {choice.stanceLabel}
                  </p>
                </button>
              )
            })}
          </div>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 sm:p-8">
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
                <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-100/80">
                    Conflict summary
                  </p>
                  <p className="mt-2 text-sm leading-6 text-amber-50">
                    {activeDecision.conflict}
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  <article className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-rose-200">
                      Ethical
                    </p>
                    <p className="mt-4 text-sm leading-7 text-slate-100">
                      {activeDecision.ethical}
                    </p>
                  </article>

                  <article className="rounded-3xl border border-sky-400/20 bg-sky-500/10 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-sky-200">
                      Legal
                    </p>
                    <p className="mt-4 text-sm leading-7 text-slate-100">
                      {activeDecision.legal}
                    </p>
                  </article>

                  <article className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">
                      Environmental
                    </p>
                    <p className="mt-4 text-sm leading-7 text-slate-100">
                      {activeDecision.environmental}
                    </p>
                  </article>
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

          {allScenariosComplete && (
            <section className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6 sm:p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
                Final Reflection
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Your city policy is complete
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-50">
                The simulator does not mark answers as simply right or wrong.
                Instead, it shows that digital technology choices involve
                competing priorities such as civil liberties, safety,
                accountability, and sustainability. Use your results to practise
                balanced exam paragraphs.
              </p>
            </section>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
