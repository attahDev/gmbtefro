import { useEffect, useState } from 'react'
import ChatSideBarPanel from '../ChatSideBar/ChatSideBarPanel'
import IGEmpty from './IGEmpty'
import IGInsightCards from './IGInsightCards'
import IGNextSteps from './IGNextSteps'
import IGPreviousIdeas from './IGPreviousIdeas'
import IGResultHero from './IGResultHero'
import IGRevenueChart from './IGRevenueChart'
import IGScoreBreakdown from './IGScoreBreakdown'
import { getIdea, listIdeas, type IdeaContent } from '../lib/ideaEngineApi'
import { getCurrentIdeaId, setCurrentIdeaId } from '../lib/currentIdea'

export const IGDashboardSection = () => {
  const [content, setContent] = useState<IdeaContent | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [hasIdea, setHasIdea] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadIdea = (ideaId: string) =>
      getIdea(ideaId).then((idea) => {
        if (cancelled) return
        setContent(idea.content)
        setCurrentIdeaId(idea.id)
        setHasIdea(true)
      })

    const ideaId = getCurrentIdeaId()

    const fallbackToHistory = () =>
      listIdeas()
        .then((ideas) => {
          if (cancelled || ideas.length === 0) return
          // No session-scoped "current" idea (fresh tab, cleared session, etc.)
          // but the user does have saved history — load the most recent one
          // instead of showing the empty state.
          return loadIdea(ideas[0].id)
        })
        .catch(() => {
          /* no saved ideas or history fetch failed — empty state is correct */
        })

    const chain = ideaId
      ? loadIdea(ideaId).catch(() => fallbackToHistory())
      : fallbackToHistory()

    chain.finally(() => {
      if (!cancelled) setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div className="min-h-screen bg-[#F2F2EE]" />
  }

  return (
    <div className="min-h-screen bg-[#F2F2EE] px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-4 sm:space-y-6">
        {hasIdea ? (
          <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,430px)] xl:items-start">
            <div className="min-w-0 space-y-4 sm:space-y-6">
              <IGResultHero content={content} />
              <IGInsightCards content={content} />
              <IGRevenueChart content={content} />
              <IGScoreBreakdown content={content} />
              <IGNextSteps content={content} />
              <IGPreviousIdeas />
            </div>

            <ChatSideBarPanel />
          </div>
        ) : (
          <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,430px)] xl:items-start">
            <IGEmpty />
            <ChatSideBarPanel />
          </div>
        )}
      </div>
    </div>
  )
}
