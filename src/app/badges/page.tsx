"use client";

import React, { useState, useEffect } from 'react';

// Badge data structure
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  rarity: string;
  target: number;
  progress: number;
  earned: boolean;
  premium: boolean;
  earnedDate?: string;
}

// Badge tracker class
class BadgeTracker {
  stats: {
    currentStreak: number;
    badgesEarned: number;
    breakthroughs: number;
  };

  constructor() {
    this.stats = {
      currentStreak: 0,
      badgesEarned: 0,
      breakthroughs: 0
    };
    this.loadStats();
  }

  loadStats() {
    const savedStats = localStorage.getItem('haven_badge_stats');
    if (savedStats) {
      this.stats = JSON.parse(savedStats);
    }
  }

  saveStats() {
    localStorage.setItem('haven_badge_stats', JSON.stringify(this.stats));
  }

  updateProgress(badgeId: string, progress: number) {
    // Update badge progress logic
    const badgeProgress = JSON.parse(localStorage.getItem('haven_badge_progress') || '{}');
    badgeProgress[badgeId] = progress;
    localStorage.setItem('haven_badge_progress', JSON.stringify(badgeProgress));
  }

  getWeekKey() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  }
}

export default function BadgesPage() {
  const [badgeTracker] = useState(() => new BadgeTracker());
  const [currentStreak, setCurrentStreak] = useState(0);
  const [badgesEarned, setBadgesEarned] = useState(0);
  const [breakthroughs, setBreakthroughs] = useState(0);

  // Badge definitions
  const badges: Badge[] = [
    // STARTER BADGES
    {
      id: 'first-haven-chat',
      name: 'First Haven Chat',
      description: 'Started your emotional intelligence journey',
      icon: '🏠',
      category: 'STARTER BADGES',
      rarity: 'Common',
      target: 1,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'first-message',
      name: 'First Conversation',
      description: 'Send your first message to Haven',
      icon: '💬',
      category: 'STARTER BADGES',
      rarity: 'Common',
      target: 1,
      progress: 0,
      earned: false,
      premium: false
    },
    // CONSISTENCY BADGES
    {
      id: '3-day-streak',
      name: '3-Day Haven Streak',
      description: 'Daily check-ins for three days',
      icon: '🔥',
      category: 'CONSISTENCY BADGES',
      rarity: 'Common',
      target: 3,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: '7-day-streak',
      name: '7-Day Haven Streak',
      description: 'Daily check-ins for a full week',
      icon: '🔥',
      category: 'CONSISTENCY BADGES',
      rarity: 'Uncommon',
      target: 7,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'month-streak',
      name: 'Monthly Master',
      description: 'Use Haven for 30 consecutive days',
      icon: '📅',
      category: 'CONSISTENCY BADGES',
      rarity: 'Rare',
      target: 30,
      progress: 0,
      earned: false,
      premium: true
    },
    // CONVERSATION MILESTONES
    {
      id: 'ei-explorer',
      name: 'EI Explorer',
      description: 'Had 5 meaningful conversations',
      icon: '🕐',
      category: 'CONVERSATION MILESTONES',
      rarity: 'Common',
      target: 5,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'ei-regular',
      name: 'Haven EI Regular',
      description: 'Reached 25 conversations milestone',
      icon: '💎',
      category: 'CONVERSATION MILESTONES',
      rarity: 'Uncommon',
      target: 25,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'ei-champion',
      name: 'EI Champion',
      description: 'Completed 50 conversations with growth',
      icon: '👑',
      category: 'CONVERSATION MILESTONES',
      rarity: 'Epic',
      target: 50,
      progress: 0,
      earned: false,
      premium: true
    },
    // EMOTIONAL GROWTH BADGES
    {
      id: 'growth-seeker',
      name: 'Growth Seeker',
      description: 'Actively pursued personal development',
      icon: '🌱',
      category: 'EMOTIONAL GROWTH BADGES',
      rarity: 'Common',
      target: 1,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'mindfulness-master',
      name: 'Mindfulness Master',
      description: 'Practiced mindfulness and self-awareness',
      icon: '🧘',
      category: 'EMOTIONAL GROWTH BADGES',
      rarity: 'Rare',
      target: 1,
      progress: 0,
      earned: false,
      premium: true
    },
    // LIFE SKILLS BADGES
    {
      id: 'comfort-zone-warrior',
      name: 'Comfort Zone Warrior',
      description: 'Stepped outside your comfort zone with courage',
      icon: '🏆',
      category: 'LIFE SKILLS BADGES',
      rarity: 'Uncommon',
      target: 1,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'boundary-builder',
      name: 'Boundary Builder',
      description: 'Set healthy emotional boundaries',
      icon: '🛡️',
      category: 'LIFE SKILLS BADGES',
      rarity: 'Common',
      target: 1,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'crisis-overcomer',
      name: 'Crisis Supporter',
      description: 'Successfully navigate a difficult emotional situation',
      icon: '🆘',
      category: 'LIFE SKILLS BADGES',
      rarity: 'Epic',
      target: 1,
      progress: 0,
      earned: false,
      premium: true
    },
    // WELLNESS BADGES
    {
      id: 'self-care-champion',
      name: 'Self-Care Champion',
      description: 'Discuss self-care strategies in 3 conversations',
      icon: '💗',
      category: 'WELLNESS BADGES',
      rarity: 'Common',
      target: 3,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'gratitude-practitioner',
      name: 'Gratitude Practitioner',
      description: 'Practice gratitude in 5 conversations',
      icon: '🙏',
      category: 'WELLNESS BADGES',
      rarity: 'Uncommon',
      target: 5,
      progress: 0,
      earned: false,
      premium: true
    },
    // DAILY HABIT BADGES
    {
      id: 'morning-gratitude',
      name: 'Morning Gratitude',
      description: 'Complete your daily gratitude journal',
      icon: '☀️',
      category: 'DAILY HABIT BADGES',
      rarity: 'Common',
      target: 1,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'daily-zen',
      name: 'Daily Zen',
      description: 'Complete all 6 daily practices',
      icon: '🧘',
      category: 'DAILY HABIT BADGES',
      rarity: 'Uncommon',
      target: 6,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'mood-master',
      name: 'Mood Master',
      description: 'Track your mood in the journal today',
      icon: '🎭',
      category: 'DAILY HABIT BADGES',
      rarity: 'Rare',
      target: 1,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'self-love-champion',
      name: 'Self-Love Champion',
      description: 'Practice self-compassion today',
      icon: '💝',
      category: 'DAILY HABIT BADGES',
      rarity: 'Common',
      target: 1,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'connection-keeper',
      name: 'Connection Keeper',
      description: 'Reach out to someone today',
      icon: '🤝',
      category: 'DAILY HABIT BADGES',
      rarity: 'Common',
      target: 1,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'work-break-warrior',
      name: 'Work Break Warrior',
      description: 'Take mindful breaks during work',
      icon: '⏰',
      category: 'DAILY HABIT BADGES',
      rarity: 'Uncommon',
      target: 3,
      progress: 0,
      earned: false,
      premium: true
    },
    // WEEKLY CHALLENGE BADGES
    {
      id: 'weekly-warrior',
      name: 'Weekly Warrior',
      description: 'Complete 5 conversations this week',
      icon: '📅',
      category: 'WEEKLY CHALLENGE BADGES',
      rarity: 'Common',
      target: 5,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'journal-enthusiast',
      name: 'Journal Enthusiast',
      description: 'Write 3 journal entries this week',
      icon: '📝',
      category: 'WEEKLY CHALLENGE BADGES',
      rarity: 'Common',
      target: 3,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'growth-sprinter',
      name: 'Growth Sprinter',
      description: 'Complete 4 growth activities this week',
      icon: '🚀',
      category: 'WEEKLY CHALLENGE BADGES',
      rarity: 'Uncommon',
      target: 4,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'comfort-zone-crusher',
      name: 'Comfort Zone Crusher',
      description: 'Step outside comfort zone 2 times this week',
      icon: '💪',
      category: 'WEEKLY CHALLENGE BADGES',
      rarity: 'Uncommon',
      target: 2,
      progress: 0,
      earned: false,
      premium: false
    },
    // MONTHLY GOAL BADGES
    {
      id: 'monthly-champion',
      name: 'Monthly Champion',
      description: 'Complete 20 daily activities this month',
      icon: '🏆',
      category: 'MONTHLY GOAL BADGES',
      rarity: 'Rare',
      target: 20,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'gratitude-master',
      name: 'Gratitude Master',
      description: 'Write 15 gratitude entries this month',
      icon: '🙏',
      category: 'MONTHLY GOAL BADGES',
      rarity: 'Rare',
      target: 15,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'ei-scholar',
      name: 'EI Scholar',
      description: 'Complete 30 conversations this month',
      icon: '🎓',
      category: 'MONTHLY GOAL BADGES',
      rarity: 'Epic',
      target: 30,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'boundary-boss',
      name: 'Boundary Boss',
      description: 'Practice boundary setting 8 times this month',
      icon: '🛡️',
      category: 'MONTHLY GOAL BADGES',
      rarity: 'Rare',
      target: 8,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'wellness-warrior',
      name: 'Wellness Warrior',
      description: 'Complete 25 wellness activities this month',
      icon: '💚',
      category: 'MONTHLY GOAL BADGES',
      rarity: 'Epic',
      target: 25,
      progress: 0,
      earned: false,
      premium: true
    },
    // STREAK MULTIPLIER BADGES
    {
      id: 'streak-spark',
      name: 'Spark',
      description: 'Maintain a 3-day streak',
      icon: '✨',
      category: 'STREAK MULTIPLIER BADGES',
      rarity: 'Common',
      target: 3,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'streak-flame',
      name: 'Flame',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      category: 'STREAK MULTIPLIER BADGES',
      rarity: 'Uncommon',
      target: 7,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'streak-inferno',
      name: 'Inferno',
      description: 'Maintain a 30-day streak',
      icon: '🌋',
      category: 'STREAK MULTIPLIER BADGES',
      rarity: 'Epic',
      target: 30,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'streak-phoenix',
      name: 'Phoenix',
      description: 'Maintain a 100-day streak',
      icon: '🦅',
      category: 'STREAK MULTIPLIER BADGES',
      rarity: 'Legendary',
      target: 100,
      progress: 0,
      earned: false,
      premium: false
    },
    // SOCIAL SHARING BADGES
    {
      id: 'good-vibes-spreader',
      name: 'Good Vibes Spreader',
      description: 'Share positive content 5 times',
      icon: '🌟',
      category: 'SOCIAL SHARING BADGES',
      rarity: 'Common',
      target: 5,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'inspiration-ambassador',
      name: 'Inspiration Ambassador',
      description: 'Inspire others through sharing',
      icon: '💫',
      category: 'SOCIAL SHARING BADGES',
      rarity: 'Uncommon',
      target: 3,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'support-circle-builder',
      name: 'Support Circle Builder',
      description: 'Build a supportive community',
      icon: '🤗',
      category: 'SOCIAL SHARING BADGES',
      rarity: 'Rare',
      target: 1,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'wellness-influencer',
      name: 'Wellness Influencer',
      description: 'Share wellness tips and practices',
      icon: '💚',
      category: 'SOCIAL SHARING BADGES',
      rarity: 'Uncommon',
      target: 5,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'community-champion',
      name: 'Community Champion',
      description: 'Actively participate in community',
      icon: '🏆',
      category: 'SOCIAL SHARING BADGES',
      rarity: 'Rare',
      target: 10,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'mental-health-advocate',
      name: 'Mental Health Advocate',
      description: 'Advocate for mental health awareness',
      icon: '🧠',
      category: 'SOCIAL SHARING BADGES',
      rarity: 'Epic',
      target: 1,
      progress: 0,
      earned: false,
      premium: false
    },
    // ADVANCED TRACKING BADGES
    {
      id: 'data-detective',
      name: 'Data Detective',
      description: 'Analyze your emotional patterns over 30 days',
      icon: '📊',
      category: 'ADVANCED TRACKING BADGES',
      rarity: 'Epic',
      target: 30,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'goal-getter',
      name: 'Goal Getter',
      description: 'Set and achieve 10 personal growth goals',
      icon: '🎯',
      category: 'ADVANCED TRACKING BADGES',
      rarity: 'Legendary',
      target: 10,
      progress: 0,
      earned: false,
      premium: true
    },
    {
      id: 'pattern-master',
      name: 'Pattern Master',
      description: 'Identify and break 5 negative emotional patterns',
      icon: '🔍',
      category: 'ADVANCED TRACKING BADGES',
      rarity: 'Epic',
      target: 5,
      progress: 0,
      earned: false,
      premium: true
    },
    // SEASONAL CHALLENGE BADGES
    {
      id: 'spring-awakening',
      name: 'Spring Awakening',
      description: 'Embrace new beginnings and growth',
      icon: '🌸',
      category: 'SEASONAL CHALLENGE BADGES',
      rarity: 'Rare',
      target: 1,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'summer-shine',
      name: 'Summer Shine',
      description: 'Radiate confidence and positivity',
      icon: '☀️',
      category: 'SEASONAL CHALLENGE BADGES',
      rarity: 'Rare',
      target: 1,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'autumn-wisdom',
      name: 'Autumn Wisdom',
      description: 'Harvest insights and reflect on growth',
      icon: '🍂',
      category: 'SEASONAL CHALLENGE BADGES',
      rarity: 'Rare',
      target: 1,
      progress: 0,
      earned: false,
      premium: false
    },
    {
      id: 'winter-strength',
      name: 'Winter Strength',
      description: 'Build resilience during challenging times',
      icon: '❄️',
      category: 'SEASONAL CHALLENGE BADGES',
      rarity: 'Rare',
      target: 1,
      progress: 0,
      earned: false,
      premium: false
    }
  ];

  // Load badge progress on component mount
  useEffect(() => {
    loadBadgeProgress();
    loadStats();
  }, []);

  const showAchievementNotification = (badgeName: string) => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
      color: white;
      padding: 20px 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10000;
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      animation: achievementPop 0.6s ease-out;
    `;
    notification.innerHTML = `🏆 Achievement Unlocked!<br><span style="font-size: 14px;">${badgeName}</span>`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 4000);
  };

  const loadStats = () => {
    const savedStats = JSON.parse(localStorage.getItem('haven_badge_stats') || '{}');
    setCurrentStreak(savedStats.currentStreak || 0);
    setBadgesEarned(savedStats.badgesEarned || 0);
    setBreakthroughs(savedStats.breakthroughs || 0);
  };

  // Enhanced badge tracking functionality
  const loadBadgeProgress = () => {
    const badgeProgress = JSON.parse(localStorage.getItem('haven_badge_progress') || '{}');
    const earnedBadges = JSON.parse(localStorage.getItem('haven_earned_badges') || '[]');
    
    // Update badges with progress and earned status
    badges.forEach(badge => {
      badge.progress = badgeProgress[badge.id] || 0;
      badge.earned = earnedBadges.includes(badge.id);
      if (badge.earned) {
        const earnedDate = localStorage.getItem(`haven_badge_${badge.id}_date`);
        if (earnedDate) {
          badge.earnedDate = earnedDate;
        }
      }
    });

    // Load and apply various progress types
    loadConversationProgress();
    loadPracticeProgress();
    loadSocialProgress();
    loadWeeklyProgress();
    loadMonthlyProgress();
    loadStreakProgress();
    loadSocialSharingProgress();
    loadAdvancedTrackingProgress();
  };

  const loadConversationProgress = () => {
    const conversations = JSON.parse(localStorage.getItem('havenConversations') || '[]');
    const totalConversations = conversations.length;
    
    // Update conversation-related badges
    updateBadgeProgress('first-haven-chat', totalConversations > 0 ? 1 : 0);
    updateBadgeProgress('first-message', totalConversations > 0 ? 1 : 0);
    updateBadgeProgress('ei-explorer', Math.min(totalConversations, 5));
    updateBadgeProgress('ei-regular', Math.min(totalConversations, 25));
    updateBadgeProgress('ei-champion', Math.min(totalConversations, 50));
  };

  const loadPracticeProgress = () => {
    const practiceProgress = JSON.parse(localStorage.getItem('haven_practice_progress') || '{}');
    
    if (practiceProgress.mindfulness) {
      updateBadgeProgress('mindfulness-master', 1);
    }
    if (practiceProgress['boundary-setting']) {
      updateBadgeProgress('boundary-builder', 1);
    }
    if (practiceProgress['comfort-zone']) {
      updateBadgeProgress('comfort-zone-warrior', 1);
    }
    if (practiceProgress['crisis-support']) {
      updateBadgeProgress('crisis-overcomer', 1);
    }
  };

  const loadSocialProgress = () => {
    const socialProgress = JSON.parse(localStorage.getItem('haven_social_progress') || '{}');
    
    if (socialProgress.journal || socialProgress.insight) {
      updateBadgeProgress('growth-seeker', 1);
    }
  };

  const loadWeeklyProgress = () => {
    const weeklyMessages = JSON.parse(localStorage.getItem('haven_weekly_messages') || '{}');
    const weeklyJournals = JSON.parse(localStorage.getItem('haven_weekly_journals') || '{}');
    const weeklyActivities = JSON.parse(localStorage.getItem('haven_weekly_activities') || '{}');
    const weeklyComfortZone = JSON.parse(localStorage.getItem('haven_weekly_comfort_zone') || '{}');
    
    const currentWeek = badgeTracker.getWeekKey();
    
    if (weeklyMessages[currentWeek]) {
      updateBadgeProgress('weekly-warrior', Math.min(weeklyMessages[currentWeek], 5));
    }
    if (weeklyJournals[currentWeek]) {
      updateBadgeProgress('journal-enthusiast', Math.min(weeklyJournals[currentWeek], 3));
    }
    if (weeklyActivities[currentWeek]) {
      updateBadgeProgress('growth-sprinter', Math.min(weeklyActivities[currentWeek].length, 4));
    }
    if (weeklyComfortZone[currentWeek]) {
      updateBadgeProgress('comfort-zone-crusher', Math.min(weeklyComfortZone[currentWeek].length, 2));
    }
  };

  const loadMonthlyProgress = () => {
    const monthlyActivities = JSON.parse(localStorage.getItem('haven_monthly_activities') || '{}');
    const currentMonth = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0');
    
    if (monthlyActivities[currentMonth]) {
      if (monthlyActivities[currentMonth].daily_activity) {
        updateBadgeProgress('monthly-champion', Math.min(monthlyActivities[currentMonth].daily_activity, 20));
      }
      if (monthlyActivities[currentMonth].gratitude_journal) {
        updateBadgeProgress('gratitude-master', Math.min(monthlyActivities[currentMonth].gratitude_journal, 15));
      }
      if (monthlyActivities[currentMonth].conversations) {
        updateBadgeProgress('ei-scholar', Math.min(monthlyActivities[currentMonth].conversations, 30));
      }
      if (monthlyActivities[currentMonth].boundary_practice) {
        updateBadgeProgress('boundary-boss', Math.min(monthlyActivities[currentMonth].boundary_practice, 8));
      }
      if (monthlyActivities[currentMonth].wellness_activity) {
        updateBadgeProgress('wellness-warrior', Math.min(monthlyActivities[currentMonth].wellness_activity, 25));
      }
    }
  };

  const loadStreakProgress = () => {
    const currentStreak = badgeTracker.stats.currentStreak;
    updateBadgeProgress('streak-spark', Math.min(currentStreak, 3));
    updateBadgeProgress('streak-flame', Math.min(currentStreak, 7));
    updateBadgeProgress('streak-inferno', Math.min(currentStreak, 30));
    updateBadgeProgress('streak-phoenix', Math.min(currentStreak, 100));
  };

  const loadSocialSharingProgress = () => {
    const socialSharingProgress = JSON.parse(localStorage.getItem('haven_social_progress') || '{}');
    
    if (socialSharingProgress.good_vibes_spreader) {
      updateBadgeProgress('good-vibes-spreader', socialSharingProgress.good_vibes_spreader);
    }
    if (socialSharingProgress.inspiration_ambassador) {
      updateBadgeProgress('inspiration-ambassador', socialSharingProgress.inspiration_ambassador);
    }
    if (socialSharingProgress.support_circle_builder) {
      updateBadgeProgress('support-circle-builder', socialSharingProgress.support_circle_builder);
    }
    if (socialSharingProgress.wellness_influencer) {
      updateBadgeProgress('wellness-influencer', socialSharingProgress.wellness_influencer);
    }
    if (socialSharingProgress.community_champion) {
      updateBadgeProgress('community-champion', socialSharingProgress.community_champion);
    }
    if (socialSharingProgress.mental_health_advocate) {
      updateBadgeProgress('mental-health-advocate', socialSharingProgress.mental_health_advocate);
    }
  };

  const loadAdvancedTrackingProgress = () => {
    const goalProgress = JSON.parse(localStorage.getItem('haven_goal_progress') || '{}');
    const patternProgress = JSON.parse(localStorage.getItem('haven_pattern_progress') || '{}');
    
    const totalGoals = Object.values(goalProgress).reduce((sum: number, count: any) => sum + count, 0);
    if (totalGoals > 0) {
      updateBadgeProgress('goal-getter', Math.min(totalGoals, 10));
    }
    
    const totalPatterns = Object.keys(patternProgress).length;
    if (totalPatterns > 0) {
      updateBadgeProgress('pattern-master', Math.min(totalPatterns, 5));
    }
    
    const dataAnalysisProgress = JSON.parse(localStorage.getItem('haven_data_analysis_progress') || '{}');
    const daysAnalyzed = dataAnalysisProgress.days_analyzed || 0;
    if (daysAnalyzed > 0) {
      updateBadgeProgress('data-detective', Math.min(daysAnalyzed, 30));
    }
  };

  const updateBadgeProgress = (badgeId: string, progress: number) => {
    const badge = badges.find(b => b.id === badgeId);
    if (badge) {
      badge.progress = progress;
      if (progress >= badge.target && !badge.earned) {
        badge.earned = true;
        badge.earnedDate = new Date().toISOString();
        
        // Save earned badge
        const earnedBadges = JSON.parse(localStorage.getItem('haven_earned_badges') || '[]');
        if (!earnedBadges.includes(badgeId)) {
          earnedBadges.push(badgeId);
          localStorage.setItem('haven_earned_badges', JSON.stringify(earnedBadges));
          localStorage.setItem(`haven_badge_${badgeId}_date`, badge.earnedDate);
          
          // Update stats
          const newBadgesEarned = earnedBadges.length;
          setBadgesEarned(newBadgesEarned);
          
          // Show achievement notification
          showAchievementNotification(badge.name);
        }
      }
    }
  };

  const shareReferral = () => {
    const userId = localStorage.getItem('haven_user_id') || Math.random().toString(36).substr(2, 9);
    const referralCode = `HAVEN-${userId.toUpperCase()}`;
    localStorage.setItem('haven_user_id', userId);
    localStorage.setItem('haven_referral_code', referralCode);
    
    const shareText = `Join me on Haven - your AI companion for emotional intelligence! 🌟\n\nUse my referral code: ${referralCode}\n\n#Haven #EmotionalIntelligence #AICompanion`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join Haven with me!',
        text: shareText,
        url: window.location.href
      }).then(() => {
        showShareSuccess();
      }).catch(console.error);
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showShareSuccess();
    }
  };

  const shareBadge = (badgeId: string) => {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge) return;
    
    const shareText = `I just earned the "${badge.name}" badge on Haven! 🏆 #EmotionalIntelligence #Haven`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Haven Badge Earned!',
        text: shareText,
        url: window.location.href
      }).then(() => {
        showShareSuccess();
      }).catch(console.error);
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showShareSuccess();
    }
  };

  const showShareSuccess = () => {
    // Create and show notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 10000;
      font-weight: bold;
      animation: slideIn 0.5s ease-out;
    `;
    notification.innerHTML = `✨ Shared successfully! 🌟`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Group badges by category
  const badgesByCategory = badges.reduce((acc, badge) => {
    if (!acc[badge.category]) {
      acc[badge.category] = [];
    }
    acc[badge.category].push(badge);
    return acc;
  }, {} as Record<string, Badge[]>);

  return (
    <>
      <style jsx>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8f9fa;
            min-height: 100vh;
            color: #333;
            font-size: 14px;
            line-height: 1.4;
        }

        .container {
            max-width: 98%;
            margin: 0 auto;
            padding: 0 1px;
            padding-bottom: 120px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
            color: white;
            padding: 20px 15px;
            border-radius: 15px;
        }

        .header h1 {
            color: white;
            font-size: 2.2em;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .header p {
            color: #666;
            font-size: 1.1rem;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
        }

        .stats-overview {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 30px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(255, 107, 138, 0.15);
            border: 2px solid #FFD93D;
        }

        .view-collection-btn {
            display: inline-block;
            background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(255, 107, 138, 0.3);
            border: 2px solid white;
        }

        .view-collection-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(255, 107, 138, 0.4);
            background: linear-gradient(135deg, #E8447A 0%, #FF8C42 100%);
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .stat-item {
            text-align: center;
        }

        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #FF6B8A;
        }

        .stat-label {
            color: #666;
            font-size: 0.9rem;
            margin-top: 5px;
        }

        .badges-section {
            margin-bottom: 40px;
        }

        .section-title {
            color: #FF6B8A;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
        }

        .badges-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
        }

        @media (min-width: 1200px) {
            .badges-grid {
                grid-template-columns: repeat(5, 1fr);
            }
        }

        @media (min-width: 900px) and (max-width: 1199px) {
            .badges-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        .badge-card {
            background: white;
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            box-shadow: 0 8px 25px rgba(255, 107, 138, 0.15);
            transition: transform 0.3s ease;
            position: relative;
            overflow: hidden;
            min-height: 160px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 2px solid transparent;
        }

        .badge-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(255, 107, 138, 0.2);
            border: 2px solid #FF6B8A;
        }

        .badge-card.earned {
            border: 3px solid #E8447A;
            background: linear-gradient(135deg, rgba(232, 68, 122, 0.1) 0%, rgba(255, 255, 255, 1) 100%);
        }

        .badge-card.locked {
            border: 2px solid #FF9A8B;
        }

        .premium-badge {
            position: relative;
        }

        .premium-lock {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.2rem;
            color: #FFD93D;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            z-index: 10;
        }

        .premium-badge .badge-card {
            opacity: 0.8;
        }

        .premium-badge:hover .premium-lock {
            transform: scale(1.1);
            transition: transform 0.3s ease;
        }

        .badge-icon {
            font-size: 1.75rem;
            margin-bottom: 8px;
            opacity: 0.8;
        }

        .badge-name {
            font-size: 0.75rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
            line-height: 1.2;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }

        .badge-description {
            color: #666;
            font-size: 0.6rem;
            line-height: 1.4;
            margin-bottom: 10px;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }

        .badge-progress {
            background: #f0f0f0;
            height: 6px;
            border-radius: 15px;
            overflow: hidden;
            margin-bottom: 8px;
        }

        .badge-progress-fill {
            background: linear-gradient(90deg, #FF6B8A 0%, #FF9A8B 100%);
            height: 100%;
            border-radius: 15px;
            transition: width 0.3s ease;
        }

        .badge-details {
            margin-top: auto;
            padding-top: 8px;
            border-top: 1px solid #eee;
            flex-shrink: 0;
        }

        .badge-stats {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 0.65rem;
            color: #666;
            flex-wrap: wrap;
            gap: 2px;
        }

        .badge-actions {
            display: flex;
            gap: 10px;
            justify-content: center;
        }

        .share-badge-btn {
            background: #FF6B8A;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.7rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
        }

        .share-badge-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 138, 0.3);
            background: #E8447A;
        }

        /* Badge earned date */
        .badge-earned-date {
            font-size: 0.6rem;
            color: #E8447A;
            margin-top: 10px;
        }

        .badge-status {
            font-size: 0.6rem;
            font-weight: 600;
          color: #666;
        }

        .badge-status.earned {
            color: #E8447A;
        }

        .badge-status.locked {
            color: #666;
        }

        .category-header {
          color: #FF6B8A;
          font-size: 1.2rem;
          font-weight: bold;
          margin: 30px 0 10px 0;
          text-align: center;
        }

        .category-description {
          color: #666;
          font-size: 0.9rem;
          text-align: center;
          margin-bottom: 20px;
        }

        .badge-category {
          margin-bottom: 40px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Bottom Navigation */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
          border-top: 1px solid #eee;
            z-index: 1000;
            display: flex;
            flex-direction: column;
        }

        .nav-items {
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          transition: all 0.3s;
          padding: 5px;
          border-radius: 8px;
            text-decoration: none;
            color: #666;
        }

        .nav-item:hover {
          background: #f5f5f5;
        }

        .nav-item.active {
            background: #FF6B8A !important;
            color: white !important;
        }

        .nav-icon {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        .nav-item:nth-child(1) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(2) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(3) .nav-icon {
          background-image: url("/icons/Screenshot 2025-08-17 142255.png");
        }

        .nav-item:nth-child(4) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(5) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(6) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E");
        }

        .nav-item:nth-child(7) .nav-icon {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E");
        }

        .nav-item:hover .nav-icon,
        .nav-item.active .nav-icon {
            filter: brightness(0) invert(1) !important;
        }

        .nav-label {
            font-size: 14px;
            text-align: center;
        }

        .footer-banner {
            background: #f8f9fa;
            padding: 5.5px;
            text-align: center;
            border-top: 1px solid #e9ecef;
            width: 100%;
        }

        .footer-text {
            color: #666666;
            font-size: 11px;
            line-height: 1.4;
        }
      `}</style>

      <div className="container">
        <div className="header">
          <h1>🏆 Badges & Rewards</h1>
            <p>Celebrate your emotional intelligence journey and track your progress</p>
            
          {/* Social Sharing Buttons */}
          <div style={{marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button 
              onClick={shareReferral}
              style={{
                background: 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 100%)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 140, 66, 0.3)'
              }}
            >
                    📤 Share Haven
                </button>
            <button 
              onClick={() => shareBadge('first-haven-chat')}
              style={{
                background: 'linear-gradient(135deg, #FF9A8B 0%, #FFD93D 100%)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 154, 139, 0.3)'
              }}
            >
                    Share This Badge
                </button>
            </div>
        </div>

        <div className="stats-overview">
            <h3>Your Journey Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{currentStreak}</div>
              <div className="stat-label">Day Streak</div>
                </div>
            <div className="stat-item">
              <div className="stat-number">{badgesEarned}</div>
              <div className="stat-label">Badges Earned</div>
                </div>
            <div className="stat-item">
              <div className="stat-number">{breakthroughs}</div>
              <div className="stat-label">Breakthroughs</div>
                </div>
            </div>
            
          {/* View My Collection Button */}
          <div style={{marginTop: '25px', textAlign: 'center'}}>
            <a href="earned-badges-v2.html" className="view-collection-btn">
                    🏆 View My Collection
                </a>
            </div>
        </div>

        <div className="badges-section">
          <h3 className="section-title">Available Badges <span style={{fontSize: '0.8em', color: '#888', fontWeight: '400'}}>({badges.length})</span></h3>
          
          {Object.entries(badgesByCategory).map(([category, categoryBadges]) => (
            <div key={category} className="badge-category">
              <h4 className="category-header">{category}</h4>
              <p className="category-description">
                {category === 'STARTER BADGES' && 'Your first Haven steps'}
                {category === 'CONSISTENCY BADGES' && 'Building healthy habits'}
                {category === 'CONVERSATION MILESTONES' && 'Growing through dialogue'}
                {category === 'EMOTIONAL GROWTH BADGES' && 'Developing EI skills'}
                {category === 'LIFE SKILLS BADGES' && 'Building boundaries and courage'}
                {category === 'WELLNESS BADGES' && 'Self-care and balance'}
                {category === 'DAILY HABIT BADGES' && 'Daily wellness practices that reset at midnight'}
                {category === 'WEEKLY CHALLENGE BADGES' && 'Weekly growth challenges'}
                {category === 'MONTHLY GOAL BADGES' && 'Monthly achievement goals'}
                {category === 'STREAK MULTIPLIER BADGES' && 'Building momentum'}
                {category === 'SOCIAL SHARING BADGES' && 'Spreading positivity'}
                {category === 'ADVANCED TRACKING BADGES' && 'Master data analysis and pattern recognition'}
                {category === 'SEASONAL CHALLENGE BADGES' && 'Seasonal growth themes'}
              </p>
              <div className="badges-grid">
                {categoryBadges.map((badge) => (
                  <div 
                    key={badge.id}
                    className={`badge-card ${badge.earned ? 'earned' : 'locked'} ${badge.premium ? 'premium-badge' : ''}`}
                    data-badge={badge.id}
                  >
                    {badge.premium && <div className="premium-lock">🔒</div>}
                    <div className="badge-icon">{badge.icon}</div>
                    <div className="badge-name">{badge.name}</div>
                    <div className="badge-description">{badge.description}</div>
                    <div className="badge-progress">
                      <div 
                        className="badge-progress-fill" 
                        style={{width: `${Math.min((badge.progress / badge.target) * 100, 100)}%`}}
                      ></div>
                        </div>
                    <div className={`badge-status ${badge.earned ? 'earned' : 'locked'}`}>
                      Progress: {badge.progress}/{badge.target}
                        </div>
                    <div className="badge-details">
                      <div className="badge-stats">
                        <span>Progress: {badge.progress}/{badge.target}</span>
                        <span>Rarity: {badge.rarity}</span>
                            </div>
                      <div className="badge-actions">
                        <button 
                          className="share-badge-btn"
                          onClick={() => shareBadge(badge.id)}
                          style={{
                            display: 'block',
                            background: 'linear-gradient(135deg, #FF9A8B 0%, #FFD93D 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(255, 154, 139, 0.3)',
                            marginTop: '8px'
                          }}
                        >
                          {badge.earned ? 'Show It Off' : 'Share This Badge'}
                                </button>
                            </div>
                      {badge.earned && badge.earnedDate && (
                        <div className="badge-earned-date">
                          Earned: {new Date(badge.earnedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                        </div>
                ))}
                            </div>
                            </div>
          ))}
            </div>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <div className="nav-items">
            <a href="/home" className="nav-item">
              <div className="nav-icon"></div>
              <div className="nav-label">Home</div>
            </a>
            <a href="/" className="nav-item">
              <div className="nav-icon"></div>
              <div className="nav-label">Chat</div>
            </a>
            <a href="/journal" className="nav-item">
              <div className="nav-icon"></div>
              <div className="nav-label">Journal</div>
            </a>
            <a href="/badges" className="nav-item active">
              <div className="nav-icon"></div>
              <div className="nav-label">Badges</div>
            </a>
            <a href="/plans" className="nav-item">
              <div className="nav-icon"></div>
              <div className="nav-label">Plans</div>
            </a>
            <a href="/account" className="nav-item">
              <div className="nav-icon"></div>
              <div className="nav-label">Account</div>
            </a>
            <a href="/support" className="nav-item">
              <div className="nav-icon"></div>
              <div className="nav-label">Support</div>
            </a>
                    </div>
          
          {/* Footer Banner */}
          <div className="footer-banner">
            <div className="footer-text">
                    <div>Haven is an educational platform. Not medical advice.</div>
                    <div>Crisis support: 988</div>
                </div>
            </div>
        </nav>
                        </div>
    </>
  );
} 