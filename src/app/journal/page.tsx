"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function JournalPage() {
  // State variables
  const [selectedMood, setSelectedMood] = useState('');
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [moodText, setMoodText] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showPlanUpgrade, setShowPlanUpgrade] = useState(false);
  const [practiceProgress, setPracticeProgress] = useState({});
  const [insights, setInsights] = useState({});
  const [conversationSaveMode, setConversationSaveMode] = useState('auto');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [emotionalPalette, setEmotionalPalette] = useState([]);
  const [currentPractice, setCurrentPractice] = useState('');
  const [practiceChecklist, setPracticeChecklist] = useState({});
  
  // New state variables for enhanced functionality
  const [selectedMoodColor, setSelectedMoodColor] = useState('');
  const [selectedIntensity, setSelectedIntensity] = useState(0);
  const [currentMonthSimple, setCurrentMonthSimple] = useState(new Date().getMonth());
  const [currentYearSimple, setCurrentYearSimple] = useState(new Date().getFullYear());
  const [compassionProgress, setCompassionProgress] = useState(0);
  const [gratitudeData, setGratitudeData] = useState({
    morningMagic: '',
    peoplePower: '',
    personalWins: '',
    homeComfort: '',
    bodyHealth: '',
    opportunitiesGrowth: '',
    worldAroundMe: ''
  });
  const [selectedMoodEnergy, setSelectedMoodEnergy] = useState('');
  const [selectedEnergyLevel, setSelectedEnergyLevel] = useState('');
  const [selectedGratitudePower, setSelectedGratitudePower] = useState('');
  const [completedPractices, setCompletedPractices] = useState([]);
  
  // Refs
  const reflectionInputRef = useRef(null);
  
  // Load saved data on component mount
  useEffect(() => {
    loadSavedData();
    loadInsights();
    loadConversationSettings();
    loadPracticeProgress();
  }, []);

  const loadSavedData = () => {
    // Load journal entries
    const savedEntries = JSON.parse(localStorage.getItem('haven_journal_entries') || '[]');
    setJournalEntries(savedEntries);
    
    // Load practice progress
    const savedProgress = JSON.parse(localStorage.getItem('haven_practice_progress') || '{}');
    setPracticeProgress(savedProgress);
  };

  const loadInsights = () => {
    // Calculate insights from saved data
    const entries = JSON.parse(localStorage.getItem('haven_journal_entries') || '[]');
    const totalEntries = entries.length;
    const thisMonth = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0');
    const monthlyEntries = entries.filter(entry => entry.date?.startsWith(thisMonth)).length;
    
    setInsights({
      totalEntries,
      monthlyEntries,
      streak: calculateStreak(entries),
      averageMood: calculateAverageMood(entries)
    });
  };

  const loadConversationSettings = () => {
    const savedMode = localStorage.getItem('haven_conversation_save_mode') || 'auto';
    setConversationSaveMode(savedMode);
  };

  const loadPracticeProgress = () => {
    const savedProgress = JSON.parse(localStorage.getItem('haven_practice_progress') || '{}');
    setPracticeProgress(savedProgress);
  };

  const calculateStreak = (entries) => {
    if (entries.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date);
      const diffTime = Math.abs(today.getTime() - entryDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak + 1) {
        streak++;
        today.setDate(today.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateAverageMood = (entries) => {
    if (entries.length === 0) return 0;
    
    const moodEntries = entries.filter(entry => entry.mood && entry.moodIntensity);
    if (moodEntries.length === 0) return 0;
    
    const totalMood = moodEntries.reduce((sum, entry) => sum + entry.moodIntensity, 0);
    return Math.round(totalMood / moodEntries.length);
  };

  const saveJournalEntry = () => {
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      moodIntensity: moodIntensity,
      moodText: moodText,
      reflection: reflectionInputRef.current?.value || '',
      timestamp: Date.now()
    };

    const updatedEntries = [...journalEntries, entry];
    setJournalEntries(updatedEntries);
    localStorage.setItem('haven_journal_entries', JSON.stringify(updatedEntries));
    
    // Track badge progress
    trackJournalBadge('daily_gratitude');
    trackMonthlyActivity('gratitude_journal');
    
    // Clear form
    setSelectedMood('');
    setMoodIntensity(5);
    setMoodText('');
    if (reflectionInputRef.current) {
      reflectionInputRef.current.value = '';
    }
    
    // Reload insights
    loadInsights();
    
    alert('✨ Journal entry saved successfully! 🌟');
  };

  const trackJournalBadge = (badgeType) => {
    const journalProgress = JSON.parse(localStorage.getItem('haven_journal_progress') || '{}');
    const currentProgress = journalProgress[badgeType] || 0;
    journalProgress[badgeType] = currentProgress + 1;
    localStorage.setItem('haven_journal_progress', JSON.stringify(journalProgress));
    
    console.log(`Journal badge progress updated: ${badgeType} = ${currentProgress + 1}`);
  };

  const trackMonthlyActivity = (activityType) => {
    const currentMonth = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0');
    const monthlyActivities = JSON.parse(localStorage.getItem('haven_monthly_activities') || '{}');
    
    if (!monthlyActivities[currentMonth]) {
      monthlyActivities[currentMonth] = {
        daily_activity: 0,
        gratitude_journal: 0,
        wellness_activity: 0,
        conversations: 0,
        boundary_practice: 0
      };
    }
    
    if (monthlyActivities[currentMonth][activityType] !== undefined) {
      monthlyActivities[currentMonth][activityType]++;
      localStorage.setItem('haven_monthly_activities', JSON.stringify(monthlyActivities));
    }
  };

  const shareJournalEntry = () => {
    // Create shareable content
    const journalData = {
      morningMagic: document.querySelector('input[placeholder*="coffee"]')?.value || '',
      peoplePower: document.querySelector('input[placeholder*="bestie"]')?.value || '',
      personalWins: document.querySelector('input[placeholder*="task"]')?.value || '',
      homeComfort: document.querySelector('textarea[placeholder*="coffee"]')?.value || '',
      bodyHealth: document.querySelector('textarea[placeholder*="body"]')?.value || '',
      opportunitiesGrowth: document.querySelector('textarea[placeholder*="Learned"]')?.value || '',
      worldAroundMe: document.querySelector('textarea[placeholder*="Beautiful"]')?.value || ''
    };
    
    // Create share text
    let shareText = '✨ My Gratitude Journal Entry ✨\n\n';
    if (journalData.morningMagic) shareText += `🌅 Morning Magic: ${journalData.morningMagic}\n`;
    if (journalData.peoplePower) shareText += `💝 People Power: ${journalData.peoplePower}\n`;
    if (journalData.personalWins) shareText += `🎯 Personal Wins: ${journalData.personalWins}\n`;
    if (journalData.homeComfort) shareText += `🏠 Home & Comfort: ${journalData.homeComfort}\n`;
    if (journalData.bodyHealth) shareText += `💪 Body & Health: ${journalData.bodyHealth}\n`;
    if (journalData.opportunitiesGrowth) shareText += `🎨 Opportunities & Growth: ${journalData.opportunitiesGrowth}\n`;
    if (journalData.worldAroundMe) shareText += `🌍 World Around Me: ${journalData.worldAroundMe}\n`;
    
    shareText += '\n#Gratitude #Haven #Mindfulness';
    
    // Try to use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'My Gratitude Journal',
        text: shareText
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('✨ Journal entry copied to clipboard! Share it with your loved ones! 🌟');
      }).catch(() => {
        alert('✨ Journal entry ready to share! Copy and paste this:\n\n' + shareText);
      });
    }
  };

  const moodOptions = [
    { icon: '😊', label: 'Happy', value: 'happy' },
    { icon: '😌', label: 'Calm', value: 'calm' },
    { icon: '😔', label: 'Sad', value: 'sad' },
    { icon: '😤', label: 'Frustrated', value: 'frustrated' },
    { icon: '😰', label: 'Anxious', value: 'anxious' }
  ];

  // Badge Tracking Functions
  const trackPracticeBadge = (practiceType) => {
    const practiceProgress = JSON.parse(localStorage.getItem('haven_practice_progress') || '{}');
    const currentProgress = practiceProgress[practiceType] || 0;
    practiceProgress[practiceType] = currentProgress + 1;
    localStorage.setItem('haven_practice_progress', JSON.stringify(practiceProgress));
    
    console.log(`Practice badge progress updated: ${practiceType} = ${currentProgress + 1}`);
    
    // Check if badge should be earned
    checkBadgeCompletion(practiceType);
  };

  const trackSocialBadge = (shareType) => {
    const socialProgress = JSON.parse(localStorage.getItem('haven_social_progress') || '{}');
    const currentProgress = socialProgress[shareType] || 0;
    socialProgress[shareType] = currentProgress + 1;
    localStorage.setItem('haven_social_progress', JSON.stringify(socialProgress));
    
    // Update social sharing badges based on share type
    if (typeof window.badgeTracker !== 'undefined') {
      switch(shareType) {
        case 'good_vibes_spreader':
          window.badgeTracker.updateProgress('good-vibes-spreader', currentProgress + 1);
          break;
        case 'inspiration_ambassador':
          window.badgeTracker.updateProgress('inspiration-ambassador', currentProgress + 1);
          break;
        case 'support_circle_builder':
          window.badgeTracker.updateProgress('support-circle-builder', currentProgress + 1);
          break;
        case 'wellness_influencer':
          window.badgeTracker.updateProgress('wellness-influencer', currentProgress + 1);
          break;
        case 'community_champion':
          window.badgeTracker.updateProgress('community-champion', currentProgress + 1);
          break;
        case 'mental_health_advocate':
          window.badgeTracker.updateProgress('mental-health-advocate', currentProgress + 1);
          break;
      }
    }
    
    // Check if badge should be earned
    checkBadgeCompletion(shareType);
  };

  const updateBadgeProgress = (badgeId, progress) => {
    const badgeProgress = JSON.parse(localStorage.getItem('haven_badge_progress') || '{}');
    badgeProgress[badgeId] = progress;
    localStorage.setItem('haven_badge_progress', JSON.stringify(badgeProgress));
    
    console.log(`Badge progress updated: ${badgeId} = ${progress}`);
  };

  const trackWeeklyActivity = (activityType) => {
    if (typeof window.badgeTracker !== 'undefined' && window.badgeTracker.getWeekKey) {
      const weeklyActivities = JSON.parse(localStorage.getItem('haven_weekly_activities') || '{}');
      const currentWeek = window.badgeTracker.getWeekKey();
      
      if (!weeklyActivities[currentWeek]) {
        weeklyActivities[currentWeek] = [];
      }
      
      // Add activity if not already tracked this week
      if (!weeklyActivities[currentWeek].includes(activityType)) {
        weeklyActivities[currentWeek].push(activityType);
        localStorage.setItem('haven_weekly_activities', JSON.stringify(weeklyActivities));
        
        // Update growth sprinter badge (4 different activities per week)
        if (weeklyActivities[currentWeek].length <= 4) {
          updateBadgeProgress('growth-sprinter', weeklyActivities[currentWeek].length);
        }
      }
    }
  };

  const trackComfortZoneActivity = (activityType) => {
    if (typeof window.badgeTracker !== 'undefined' && window.badgeTracker.getWeekKey) {
      const weeklyComfortZone = JSON.parse(localStorage.getItem('haven_weekly_comfort_zone') || '{}');
      const currentWeek = window.badgeTracker.getWeekKey();
      
      if (!weeklyComfortZone[currentWeek]) {
        weeklyComfortZone[currentWeek] = [];
      }
      
      // Add activity if not already tracked this week
      if (!weeklyComfortZone[currentWeek].includes(activityType)) {
        weeklyComfortZone[currentWeek].push(activityType);
        localStorage.setItem('haven_weekly_comfort_zone', JSON.stringify(weeklyComfortZone));
        
        // Update comfort zone crusher badge (2 activities per week)
        if (weeklyComfortZone[currentWeek].length <= 2) {
          updateBadgeProgress('comfort-zone-crusher', weeklyComfortZone[currentWeek].length);
        }
      }
    }
  };

  const checkBadgeCompletion = (badgeId) => {
    // This function checks if a badge should be earned based on progress
    // For now, we'll just log the completion
    console.log(`Checking badge completion for: ${badgeId}`);
    
    // You can add specific logic here to determine when badges are earned
    // For example, if progress reaches certain thresholds
  };

  // New functions for enhanced functionality
  const selectMoodColor = (mood, color, emoji, label) => {
    setSelectedMoodColor({ mood, color, emoji, label });
  };

  const selectIntensity = (intensity) => {
    setSelectedIntensity(intensity);
  };

  const addToCalendar = () => {
    if (selectedMoodColor && selectedIntensity > 0) {
      const today = new Date();
      const dateString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
      
      const moodData = JSON.parse(localStorage.getItem('haven_mood_calendar') || '{}');
      moodData[dateString] = {
        mood: selectedMoodColor.mood,
        intensity: selectedIntensity,
        color: selectedMoodColor.color,
        emoji: selectedMoodColor.emoji,
        label: selectedMoodColor.label
      };
      localStorage.setItem('haven_mood_calendar', JSON.stringify(moodData));
      
      alert(`✨ Mood added to calendar: ${selectedMoodColor.label} (Intensity: ${selectedIntensity})`);
      setSelectedMoodColor('');
      setSelectedIntensity(0);
    }
  };

  const previousMonthSimple = () => {
    setCurrentMonthSimple(prev => {
      if (prev === 0) {
        setCurrentYearSimple(prevYear => prevYear - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonthSimple = () => {
    setCurrentMonthSimple(prev => {
      if (prev === 11) {
        setCurrentYearSimple(prevYear => prevYear + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const renderSimpleCalendar = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const firstDay = new Date(currentYearSimple, currentMonthSimple, 1);
    const lastDay = new Date(currentYearSimple, currentMonthSimple + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const calendarDays = [];
    
    // Add weekday headers
    weekdays.forEach(day => {
      calendarDays.push(
        <div key={`header-${day}`} className="calendar-weekday">
          {day}
        </div>
      );
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      const today = new Date();
      const isToday = day === today.getDate() && 
                     currentMonthSimple === today.getMonth() && 
                     currentYearSimple === today.getFullYear();
      
      calendarDays.push(
        <div 
          key={`day-${day}`} 
          className={`calendar-day ${isToday ? 'today' : ''}`}
          onClick={() => alert(`You clicked on day ${day}! 📅`)}
        >
          {day}
        </div>
      );
    }
    
    return (
      <>
        <div className="calendar-header">
          <div className="calendar-nav">
            <button className="nav-btn" onClick={previousMonthSimple}>‹</button>
            <div className="current-month">
              {monthNames[currentMonthSimple]} {currentYearSimple}
            </div>
            <button className="nav-btn" onClick={nextMonthSimple}>›</button>
          </div>
        </div>
        <div className="calendar-grid">
          {calendarDays}
        </div>
      </>
    );
  };

  const updateCompassionProgress = () => {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    let checkedCount = 0;
    
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkedCount++;
      }
    });
    
    const progress = (checkedCount / checkboxes.length) * 100;
    setCompassionProgress(progress);
    
    if (progress === 100) {
      // Show badge notification
      const badgeDisplay = document.getElementById('compassionBadgeDisplay');
      if (badgeDisplay) {
        badgeDisplay.style.display = 'block';
      }
    }
  };

  const togglePractice = (practiceType) => {
    setCompletedPractices(prev => {
      if (prev.includes(practiceType)) {
        return prev.filter(p => p !== practiceType);
      } else {
        return [...prev, practiceType];
      }
    });
  };

  const saveGratitudeJournal = () => {
    const gratitudeEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...gratitudeData,
      timestamp: Date.now()
    };

    const savedGratitude = JSON.parse(localStorage.getItem('haven_gratitude_entries') || '[]');
    savedGratitude.push(gratitudeEntry);
    localStorage.setItem('haven_gratitude_entries', JSON.stringify(savedGratitude));
    
    alert('✨ Gratitude journal saved successfully! 🌟');
    
    // Clear form
    setGratitudeData({
      morningMagic: '',
      peoplePower: '',
      personalWins: '',
      homeComfort: '',
      bodyHealth: '',
      opportunitiesGrowth: '',
      worldAroundMe: ''
    });
  };

  const selectMoodAndLinkToCalendar = (mood, element) => {
    setSelectedMood(mood);
    // Remove active class from all mood items
    document.querySelectorAll('.mood-item').forEach(item => {
      item.classList.remove('selected');
    });
    // Add active class to clicked item
    element.classList.add('selected');
  };



  // Advanced Tracking Functions
  const trackDataAnalysis = (daysAnalyzed) => {
    if (typeof window.badgeTracker !== 'undefined') {
      // Track data detective badge (30 days of analysis)
      if (daysAnalyzed <= 30) {
        updateBadgeProgress('data-detective', daysAnalyzed);
      }
    }
  };

  const trackGoalAchievement = (goalType) => {
    if (typeof window.badgeTracker !== 'undefined') {
      const goalProgress = JSON.parse(localStorage.getItem('haven_goal_progress') || '{}');
      const currentProgress = goalProgress[goalType] || 0;
      goalProgress[goalType] = currentProgress + 1;
      localStorage.setItem('haven_goal_progress', JSON.stringify(goalProgress));
      
      // Track goal getter badge (10 goals achieved)
      const totalGoals = Object.values(goalProgress).reduce((sum, count) => sum + count, 0);
      if (totalGoals <= 10) {
        updateBadgeProgress('goal-getter', totalGoals);
      }
    }
  };

  const trackPatternBreak = (patternType) => {
    if (typeof window.badgeTracker !== 'undefined') {
      const patternProgress = JSON.parse(localStorage.getItem('haven_pattern_progress') || '{}');
      const currentProgress = patternProgress[patternType] || 0;
      patternProgress[patternType] = currentProgress + 1;
      localStorage.setItem('haven_pattern_progress', JSON.stringify(patternProgress));
      
      // Track pattern master badge (5 patterns broken)
      const totalPatterns = Object.keys(patternProgress).length;
      if (totalPatterns <= 5) {
        updateBadgeProgress('pattern-master', totalPatterns);
      }
    }
  };

  const showBadgeNotification = (badgeName) => {
    // Create a notification element
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
    notification.innerHTML = `🎉 New Badge Earned: ${badgeName}! 🌟`;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Advanced functions from pasted code
  const saveGratitudeJournalAdvanced = () => {
    console.log('saveGratitudeJournal called!');
    
    // Collect all the gratitude data
    const gratitudeDataAdvanced = {
      date: new Date().toISOString(),
      morningMagic: gratitudeData.morningMagic,
      peoplePower: gratitudeData.peoplePower,
      personalWins: gratitudeData.personalWins,
      homeComfort: gratitudeData.homeComfort,
      bodyHealth: gratitudeData.bodyHealth,
      opportunitiesGrowth: gratitudeData.opportunitiesGrowth,
      worldAroundMe: gratitudeData.worldAroundMe,
      selectedMood: selectedMoodEnergy,
      selectedEnergy: selectedEnergyLevel,
      selectedGratitude: selectedGratitudePower,
      completedPractices: completedPractices.length
    };
    
    // Check if any mood/energy/gratitude options are selected
    if (!selectedMoodEnergy || !selectedEnergyLevel || !selectedGratitudePower) {
      alert('Please select your mood, energy level, and gratitude power before saving! 🌟');
      return;
    }
    
    // Save to localStorage
    const savedJournals = JSON.parse(localStorage.getItem('haven_gratitude_journals') || '[]');
    savedJournals.push(gratitudeDataAdvanced);
    localStorage.setItem('haven_gratitude_journals', JSON.stringify(savedJournals));
    
    // Badge tracking for gratitude journal completion
    trackJournalBadge('daily_gratitude');
    
    // Track Morning Gratitude badge (daily)
    updateBadgeProgress('morning-gratitude', 1);
    
    // Check if all appreciation sections are completed
    const allSectionsFilled = gratitudeData.morningMagic && gratitudeData.peoplePower && 
                              gratitudeData.personalWins && gratitudeData.homeComfort && 
                              gratitudeData.bodyHealth && gratitudeData.opportunitiesGrowth && 
                              gratitudeData.worldAroundMe;
    
    if (allSectionsFilled) {
      trackJournalBadge('appreciation_master');
    }
    
    // Check if mood & energy are selected
    if (selectedMoodEnergy && selectedEnergyLevel) {
      trackJournalBadge('mood_tracker');
    }
    
    // Track Mood Master badge (daily)
    if (selectedMoodEnergy) {
      updateBadgeProgress('mood-master', 1);
    }
    
    // Check if all 6 daily practices are completed
    if (completedPractices.length >= 6) {
      trackPracticeBadge('glow_up_guru');
    }
    
    // Track Daily Zen badge (daily)
    if (completedPractices.length >= 6) {
      updateBadgeProgress('daily-zen', 6);
    }
    
    // Track weekly journal enthusiast badge (3 journal entries per week)
    if (typeof window.badgeTracker !== 'undefined' && window.badgeTracker.getWeekKey) {
      const weeklyJournals = JSON.parse(localStorage.getItem('haven_weekly_journals') || '{}');
      const currentWeek = window.badgeTracker.getWeekKey();
      weeklyJournals[currentWeek] = (weeklyJournals[currentWeek] || 0) + 1;
      localStorage.setItem('haven_weekly_journals', JSON.stringify(weeklyJournals));
      
      if (weeklyJournals[currentWeek] <= 3) {
        updateBadgeProgress('journal-enthusiast', weeklyJournals[currentWeek]);
      }
    }
    
    // Track weekly activities for growth sprinter badge
    trackWeeklyActivity('gratitude_journal');
    
    // Track additional activities based on what was completed
    if (completedPractices.length >= 6) {
      trackWeeklyActivity('daily_practices');
    }
    if (selectedMoodEnergy) {
      trackWeeklyActivity('mood_tracking');
    }
    if (allSectionsFilled) {
      trackWeeklyActivity('complete_journal');
    }
    
    // Track comfort zone activities for comfort zone crusher badge
    // Track when user shares their journal (stepping outside comfort zone)
    if (allSectionsFilled) {
      trackComfortZoneActivity('share_journal');
    }
    // Track when user practices self-compassion (can be uncomfortable)
    if (selectedGratitudePower && selectedGratitudePower.includes('self')) {
      trackComfortZoneActivity('self_compassion');
    }
    
    // Track monthly badges
    // Track monthly champion (20 days this month)
    trackMonthlyActivity('daily_activity');
    
    // Track gratitude master (15 journal entries this month)
    trackMonthlyActivity('gratitude_journal');
    
    // Track wellness warrior (25 wellness activities this month)
    trackMonthlyActivity('wellness_activity');
    
    // Show success message
    alert('✨ Your gratitude journal has been saved! Keep spreading those good vibes! 🌟');
  };

  const viewSavedJournals = () => {
    const savedJournals = JSON.parse(localStorage.getItem('haven_gratitude_journals') || '[]');
    
    if (savedJournals.length === 0) {
      alert('No saved gratitude journals found. Save your first one! ✨');
      return;
    }
    
    let message = '📖 Your Saved Gratitude Journals:\n\n';
    
    savedJournals.forEach((journal, index) => {
      const date = new Date(journal.date).toLocaleDateString();
      message += `📅 ${date}\n`;
      message += `🌅 Morning Magic: ${journal.morningMagic || 'Not filled'}\n`;
      message += `💝 People Power: ${journal.peoplePower || 'Not filled'}\n`;
      message += `🎯 Personal Wins: ${journal.personalWins || 'Not filled'}\n`;
      message += `🏠 Home & Comfort: ${journal.homeComfort || 'Not filled'}\n`;
      message += `💪 Body & Health: ${journal.bodyHealth || 'Not filled'}\n`;
      message += `🎨 Opportunities & Growth: ${journal.opportunitiesGrowth || 'Not filled'}\n`;
      message += `🌍 World Around Me: ${journal.worldAroundMe || 'Not filled'}\n`;
      message += `😊 Mood: ${journal.selectedMood || 'Not selected'}\n`;
      message += `⚡ Energy: ${journal.selectedEnergy || 'Not selected'}\n`;
      message += `✨ Gratitude Power: ${journal.selectedGratitude || 'Not selected'}\n`;
      message += `✅ Completed Practices: ${journal.completedPractices}/5\n`;
      message += `\n${'─'.repeat(50)}\n\n`;
    });
    
    alert(message);
  };

  // Enhanced mood color selection with intensity
  const getMoodColorWithIntensity = (moodName, intensity) => {
    // 40-color palette with intensity levels
    const moodColorPalette = {
      'joyful': {
        1: '#FFB3C7', // Subtle pink
        2: '#FF8FA3', // Light pink  
        3: '#FF6B8A', // Medium pink
        4: '#E8447A', // Strong pink
        5: '#D63384'  // Intense pink
      },
      'happy': {
        1: '#FFF2CC', // Subtle yellow
        2: '#FFE066', // Light yellow
        3: '#FFD93D', // Medium yellow
        4: '#FFC107', // Strong yellow
        5: '#FFB300'  // Intense yellow
      },
      'excited': {
        1: '#FFD4B3', // Subtle orange
        2: '#FFB366', // Light orange
        3: '#FF8C42', // Medium orange
        4: '#FF6B35', // Strong orange
        5: '#FF5722'  // Intense orange
      },
      'calm': {
        1: '#E3F2FD', // Subtle blue
        2: '#BBDEFB', // Light blue
        3: '#87CEEB', // Medium blue
        4: '#42A5F5', // Strong blue
        5: '#2196F3'  // Intense blue
      },
      'neutral': {
        1: '#F5F5F5', // Subtle gray
        2: '#E0E0E0', // Light gray
        3: '#D3D3D3', // Medium gray
        4: '#BDBDBD', // Strong gray
        5: '#9E9E9E'  // Intense gray
      },
      'sad': {
        1: '#D7CCC8', // Subtle brown
        2: '#BCAAA4', // Light brown
        3: '#8B4513', // Medium brown
        4: '#6D4C41', // Strong brown
        5: '#4E342E'  // Intense brown
      },
      'anxious': {
        1: '#E0F2F1', // Subtle teal
        2: '#B2DFDB', // Light teal
        3: '#2F4F4F', // Medium teal
        4: '#00695C', // Strong teal
        5: '#004D40'  // Intense teal
      },
      'angry': {
        1: '#FFCDD2', // Subtle red
        2: '#EF9A9A', // Light red
        3: '#FF0000', // Medium red
        4: '#D32F2F', // Strong red
        5: '#B71C1C'  // Intense red
      }
    };
    
    // Get the color for this mood and intensity
    const moodColors = moodColorPalette[moodName];
    if (moodColors && moodColors[intensity]) {
      return moodColors[intensity];
    }
    
    // Fallback to base color if not found
    const baseColors = {
      'joyful': '#E8447A',
      'happy': '#FFD93D', 
      'excited': '#FF8C42',
      'calm': '#87CEEB',
      'neutral': '#D3D3D3',
      'sad': '#8B4513',
      'anxious': '#2F4F4F',
      'angry': '#FF0000'
    };
    
    return baseColors[moodName] || '#D3D3D3';
  };

  // Enhanced add to calendar with color intensity
  const addToCalendarAdvanced = () => {
    if (!selectedMoodColor || !selectedIntensity) {
      alert('Please select both a mood color and intensity level first.');
      return;
    }

    // Get today's date
    const today = new Date();
    const dateString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    
    // Get the color for this mood and intensity
    const intensityColor = getMoodColorWithIntensity(selectedMoodColor.mood, selectedIntensity);
    
    // Save to localStorage
    const moodData = JSON.parse(localStorage.getItem('haven_mood_calendar') || '{}');
    moodData[dateString] = { 
      mood: selectedMoodColor.mood, 
      intensity: selectedIntensity,
      color: intensityColor,
      emoji: selectedMoodColor.emoji,
      label: selectedMoodColor.label
    };
    localStorage.setItem('haven_mood_calendar', JSON.stringify(moodData));
    
    // Update calendar
    renderSimpleCalendar();
    
    // Show confirmation
    alert(`✨ Mood added to calendar: ${selectedMoodColor.label} (Intensity: ${selectedIntensity})`);
    
    // Reset selections
    setSelectedMoodColor('');
    setSelectedIntensity(0);
  };

  // Enhanced calendar rendering with saved mood data
  const renderSimpleCalendarEnhanced = () => {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return null;
    }

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const firstDay = new Date(currentYearSimple, currentMonthSimple, 1);
    const lastDay = new Date(currentYearSimple, currentMonthSimple + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const calendarDays = [];
    
    // Add weekday headers
    weekdays.forEach(day => {
      calendarDays.push(
        <div key={`header-${day}`} className="calendar-weekday">
          {day}
        </div>
      );
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      const today = new Date();
      const isToday = day === today.getDate() && 
                     currentMonthSimple === today.getMonth() && 
                     currentYearSimple === today.getFullYear();
      
      // Check for saved mood data
      const dateString = `${currentYearSimple}-${String(currentMonthSimple + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const moodData = JSON.parse(localStorage.getItem('haven_mood_calendar') || '{}')[dateString];
      
      const dayStyle = moodData ? {
        background: moodData.color,
        color: 'white',
        fontWeight: 'bold'
      } : {};
      
      calendarDays.push(
        <div 
          key={`day-${day}`} 
          className={`calendar-day ${isToday ? 'today' : ''}`}
          style={dayStyle}
          onClick={() => selectMoodForDay(day)}
        >
          {day} {moodData?.emoji || ''}
        </div>
      );
    }
    
    return (
      <>
        <div className="calendar-header">
          <div className="calendar-nav">
            <button className="nav-btn" onClick={previousMonthSimple}>‹</button>
            <div className="current-month">
              {monthNames[currentMonthSimple]} {currentYearSimple}
            </div>
            <button className="nav-btn" onClick={nextMonthSimple}>›</button>
          </div>
        </div>
        <div className="calendar-grid">
          {calendarDays}
        </div>
      </>
    );
  };

  // Mood selection for calendar days
  const selectMoodForDay = (day) => {
    const moodOptions = [
      { name: 'joyful', color: '#E8447A', emoji: '🩷', label: 'Joyful' },
      { name: 'happy', color: '#FFD93D', emoji: '🟡', label: 'Happy' },
      { name: 'excited', color: '#FF8C42', emoji: '🟠', label: 'Excited' },
      { name: 'calm', color: '#87CEEB', emoji: '🔵', label: 'Calm' },
      { name: 'neutral', color: '#D3D3D3', emoji: '⚪', label: 'Neutral' },
      { name: 'sad', color: '#8B4513', emoji: '🟤', label: 'Sad' },
      { name: 'anxious', color: '#2F4F4F', emoji: '🔘', label: 'Anxious' },
      { name: 'angry', color: '#FF0000', emoji: '🔴', label: 'Angry' }
    ];
    
    // Simple mood selection (you can enhance this with a modal later)
    let moodChoice = prompt('Select your mood for day ' + day + ':\n\n' + 
      moodOptions.map((mood, index) => (index + 1) + '. ' + mood.emoji + ' ' + mood.label).join('\n') + 
      '\n\nEnter the number (1-8):');
    
    if (moodChoice && moodChoice >= 1 && moodChoice <= 8) {
      const selectedMood = moodOptions[moodChoice - 1];
      alert('Mood saved: ' + selectedMood.emoji + ' ' + selectedMood.label + ' for day ' + day);
      
      // Save to localStorage
      const moodData = JSON.parse(localStorage.getItem('haven_mood_calendar') || '{}');
      const dateString = currentYearSimple + '-' + 
        String(currentMonthSimple + 1).padStart(2, '0') + '-' + 
        String(day).padStart(2, '0');
      moodData[dateString] = { 
        mood: selectedMood.name, 
        intensity: 5,
        color: selectedMood.color,
        emoji: selectedMood.emoji,
        label: selectedMood.label
      };
      localStorage.setItem('haven_mood_calendar', JSON.stringify(moodData));
      
      // Re-render calendar
      renderSimpleCalendar();
    }
  };

  // Test functions for debugging
  const testMoodSystem = () => {
    alert('testMoodSystem called!');
    // Add a test mood to today's date
    const today = new Date();
    const dateString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    
    const testMood = {
      mood: 'sad',
      intensity: 4,
      color: '#8d6e63',
      emoji: '🟤',
      label: 'Sad'
    };
    
    const moodData = JSON.parse(localStorage.getItem('haven_mood_calendar') || '{}');
    moodData[dateString] = testMood;
    localStorage.setItem('haven_mood_calendar', JSON.stringify(moodData));
    
    alert('Test mood saved! Date: ' + dateString);
    renderSimpleCalendar();
  };

  const testCalendar = () => {
    console.log('=== CALENDAR TEST ===');
    console.log('Current month:', currentMonthSimple);
    console.log('Current year:', currentYearSimple);
    console.log('Calendar container exists:', !!document.getElementById('simple-calendar-container'));
    console.log('Calendar grid exists:', !!document.getElementById('simple-calendar-grid'));
    
    const today = new Date();
    console.log('Today:', today);
    console.log('Today\'s date:', today.getDate());
    console.log('Today\'s month:', today.getMonth());
    console.log('Today\'s year:', today.getFullYear());
    
    // Test mood data
    const testDate = `${currentYearSimple}-${String(currentMonthSimple + 1).padStart(2, '0')}-01`;
    console.log('Test date:', testDate);
    
    // Force render
    console.log('Forcing calendar render...');
    renderSimpleCalendar();
    console.log('Calendar render complete');
  };

  // Populate calendar grid after component mounts (avoids hydration issues)
  const populateCalendarGrid = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const grid = document.querySelector('#simple-calendar-container .calendar-grid');
    if (!grid) return;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const firstDay = new Date(currentYearSimple, currentMonthSimple, 1);
    const lastDay = new Date(currentYearSimple, currentMonthSimple + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Clear the grid
    grid.innerHTML = '';
    
    // Add weekday headers
    weekdays.forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'calendar-weekday';
      dayHeader.textContent = day;
      grid.appendChild(dayHeader);
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'calendar-day empty';
      grid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      const today = new Date();
      const isToday = day === today.getDate() && 
                     currentMonthSimple === today.getMonth() && 
                     currentYearSimple === today.getFullYear();
      
      // Check for saved mood data
      const dateString = `${currentYearSimple}-${String(currentMonthSimple + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const moodData = JSON.parse(localStorage.getItem('haven_mood_calendar') || '{}')[dateString];
      
      const dayElement = document.createElement('div');
      dayElement.className = `calendar-day ${isToday ? 'today' : ''}`;
      dayElement.textContent = day;
      
      if (moodData) {
        dayElement.style.background = moodData.color;
        dayElement.style.color = 'white';
        dayElement.style.fontWeight = 'bold';
        if (moodData.emoji) {
          dayElement.innerHTML = day + ' ' + moodData.emoji;
        }
      }
      
      dayElement.onclick = () => selectMoodForDay(day);
      grid.appendChild(dayElement);
    }
    
    // Update month display
    const monthDisplay = document.querySelector('#simple-calendar-container .current-month');
    if (monthDisplay) {
      monthDisplay.textContent = monthNames[currentMonthSimple] + ' ' + currentYearSimple;
    }
  };

  // Load compassion practice progress
  const loadCompassionProgress = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const today = new Date().toDateString();
    const progressData = JSON.parse(localStorage.getItem('haven_compassion_progress') || '{}');
    const todayProgress = progressData[today] || 0;
    
    // Restore checkbox states if they exist
    const checkboxes = [
      'mindfulSelfCompassion1',
      'mindfulSelfCompassion2', 
      'mindfulSelfCompassion3',
      'mindfulSelfCompassion4',
      'mindfulSelfCompassion5'
    ];
    
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = document.getElementById(checkboxes[i]);
      if (checkbox) {
        (checkbox as HTMLInputElement).checked = i < todayProgress;
      }
    }
    
    // Update progress display if elements exist
    const progressFill = document.getElementById('compassionProgressFill');
    const progressText = document.getElementById('compassionProgressText');
    
    if (progressFill && progressText) {
      const progressPercentage = (todayProgress / checkboxes.length) * 100;
      (progressFill as HTMLElement).style.width = progressPercentage + '%';
      progressText.textContent = Math.round(progressPercentage) + '% completed';
    }
    
    // Show badge if already earned today
    const earnedBadges = JSON.parse(localStorage.getItem('haven_compassion_badges') || '[]');
    if (earnedBadges.includes(today)) {
      const badgeDisplay = document.getElementById('compassionBadgeDisplay');
      if (badgeDisplay) {
        badgeDisplay.style.display = 'block';
      }
    }
  };

  // Final functions from pasted code
  const loadJournalEntries = () => {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return;
    }

    const entries = JSON.parse(localStorage.getItem('haven_journal_entries') || '[]');
    const entriesList = document.getElementById('entriesList');
    
    if (!entriesList) return;
    
    if (entries.length === 0) {
      entriesList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No journal entries yet. Start by adding your first reflection!</p>';
      return;
    }
    
    entriesList.innerHTML = entries.map((entry: any) => `
      <div class="entry-item">
        <div class="entry-header">
          <div class="entry-date">${entry.date}</div>
          <div class="entry-mood">
            <span class="entry-mood-emoji">${getMoodEmoji(entry.mood)}</span>
            <span class="entry-mood-label">${getMoodLabel(entry.mood)}</span>
          </div>
        </div>
        <div class="entry-content">"${entry.reflection}"</div>
      </div>
    `).join('');
  };

  const getMoodEmoji = (mood: string) => {
    const emojis: { [key: string]: string } = {
      'excited': '😊',
      'calm': '😌',
      'neutral': '😐',
      'anxious': '😰',
      'sad': '😔'
    };
    return emojis[mood] || '😐';
  };

  const getMoodLabel = (mood: string) => {
    const labels: { [key: string]: string } = {
      'excited': 'Happy',
      'calm': 'Calm',
      'neutral': 'Neutral',
      'anxious': 'Anxious',
      'sad': 'Sad'
    };
    return labels[mood] || 'Neutral';
  };

  const filterEntries = (mood: string) => {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return;
    }

    // Load and filter entries based on mood
    const entries = JSON.parse(localStorage.getItem('haven_journal_entries') || '[]');
    const entriesList = document.getElementById('entriesList');
    
    if (!entriesList) return;
    
    if (entries.length === 0) {
      entriesList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No journal entries yet. Start by adding your first reflection!</p>';
      return;
    }
    
    // Filter entries based on mood
    let filteredEntries = entries;
    if (mood !== 'all') {
      filteredEntries = entries.filter((entry: any) => entry.mood === mood);
    }
    
    if (filteredEntries.length === 0) {
      entriesList.innerHTML = `<p style="text-align: center; color: #666; padding: 20px;">No ${mood} entries found. Try selecting "All" to see all entries.</p>`;
      return;
    }
    
    entriesList.innerHTML = filteredEntries.map((entry: any) => `
      <div class="entry-item">
        <div class="entry-header">
          <div class="entry-date">${entry.date}</div>
          <div class="entry-mood">
            <span class="entry-mood-emoji">${getMoodEmoji(entry.mood)}</span>
            <span class="entry-mood-label">${getMoodLabel(entry.mood)}</span>
          </div>
        </div>
        <div class="entry-content">"${entry.reflection}"</div>
      </div>
    `).join('');
  };

  // Helper function to extract key phrases from insights
  const extractKeyPhrase = (text: string) => {
    if (!text) return 'Insights';
    
    // Extract the first meaningful phrase (up to 3-4 words)
    const words = text.split(' ').slice(0, 4);
    return words.join(' ');
  };

  // Load emotional insights from chat data
  const loadEmotionalInsights = async () => {
    try {
      // Get user ID from localStorage or generate one
      const userId = localStorage.getItem('havenUserId') || 'user-' + Date.now();
      localStorage.setItem('havenUserId', userId);
      
      // Get conversation history from localStorage
      const conversationHistory = JSON.parse(localStorage.getItem('havenConversations') || '[]');
      
      // If no conversations exist, show fallback content immediately
      if (conversationHistory.length === 0) {
        console.log('No conversation history found, showing fallback insights');
        setFallbackEmotionalInsights();
        return;
      }
      
      const response = await fetch('/api/extract-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          conversationHistory: conversationHistory,
          pageType: 'journal'
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.insights) {
        // Update the emotional insight cards with real data
        const growthPattern = data.insights.growthPatterns[0] || 'Your growth patterns will emerge as you engage with Haven';
        const strengthDiscovery = data.insights.strengthDiscoveries[0] || 'Your strengths will be discovered through your interactions';
        const nextGrowthEdge = data.insights.nextGrowthEdges[0] || 'Your next growth opportunities will be identified as you continue your journey';
        const emotionalTrend = data.insights.moodTrends[0] || 'Your emotional patterns are being analyzed';
        
        // Extract key phrases for display
        const growthElement = document.getElementById('adding-growth-pattern');
        const growthDescElement = document.getElementById('adding-growth-description');
        const strengthElement = document.getElementById('adding-strength-discovery');
        const strengthDescElement = document.getElementById('adding-strength-description');
        const nextElement = document.getElementById('adding-next-growth-edge');
        const nextDescElement = document.getElementById('adding-next-growth-description');
        const trendElement = document.getElementById('adding-learning-trend');
        const trendDescElement = document.getElementById('adding-learning-trend-description');
        
        if (growthElement) growthElement.textContent = extractKeyPhrase(growthPattern);
        if (growthDescElement) growthDescElement.textContent = growthPattern;
        if (strengthElement) strengthElement.textContent = extractKeyPhrase(strengthDiscovery);
        if (strengthDescElement) strengthDescElement.textContent = strengthDiscovery;
        if (nextElement) nextElement.textContent = extractKeyPhrase(nextGrowthEdge);
        if (nextDescElement) nextDescElement.textContent = nextGrowthEdge;
        if (trendElement) trendElement.textContent = extractKeyPhrase(emotionalTrend);
        if (trendDescElement) trendDescElement.textContent = emotionalTrend;
        
        // Add loading animation
        const insightsContainer = document.getElementById('adding-insights-container');
        if (insightsContainer) insightsContainer.style.opacity = '1';
      } else {
        console.error('Failed to load emotional insights:', data.error);
        // Show fallback content
        setFallbackEmotionalInsights();
      }
    } catch (error) {
      console.error('Error loading emotional insights:', error);
      // Show fallback content
      setFallbackEmotionalInsights();
    }
  };

  const setFallbackEmotionalInsights = () => {
    const growthElement = document.getElementById('adding-growth-pattern');
    const growthDescElement = document.getElementById('adding-growth-description');
    const strengthElement = document.getElementById('adding-strength-discovery');
    const strengthDescElement = document.getElementById('adding-strength-description');
    const nextElement = document.getElementById('adding-next-growth-edge');
    const nextDescElement = document.getElementById('adding-next-growth-description');
    const trendElement = document.getElementById('adding-learning-trend');
    const trendDescElement = document.getElementById('adding-learning-trend-description');
    
    if (growthElement) growthElement.textContent = 'Growth Patterns';
    if (growthDescElement) growthDescElement.textContent = 'Start your journey with Haven to discover your growth patterns';
    if (strengthElement) strengthElement.textContent = 'Your Strengths';
    if (strengthDescElement) strengthDescElement.textContent = 'Your strengths will emerge as you engage with Haven';
    if (nextElement) nextElement.textContent = 'Next Steps';
    if (nextDescElement) nextDescElement.textContent = 'Begin conversations to identify your next growth opportunities';
    if (trendElement) trendElement.textContent = 'Emotional Trends';
    if (trendDescElement) trendDescElement.textContent = 'Your emotional patterns will be analyzed as you continue your journey';
  };

  // Mood Colors Functionality
  const generateMoodColors = () => {
    const moodDescription = (document.getElementById('moodDescription') as HTMLInputElement)?.value?.trim();
    const intensity = (document.getElementById('intensitySlider') as HTMLInputElement)?.value;
    
    if (!moodDescription) {
      alert('Please describe your mood or emotions first.');
      return;
    }

    // Show loading state
    const button = document.querySelector('.generate-mood-button');
    if (!button) return;
    
    const originalText = button.innerHTML;
    button.innerHTML = '🎨 Generating...';
    (button as HTMLButtonElement).disabled = true;

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate color palette based on mood and intensity
      const palette = generateColorPalette(moodDescription, intensity);
      displayMoodPalette(palette);
      
      // Restore button
      button.innerHTML = originalText;
      (button as HTMLButtonElement).disabled = false;
    }, 2000);
  };

  const generateColorPalette = (moodDescription: string, intensity: string) => {
    // Simple color generation based on mood keywords
    const moodKeywords = moodDescription.toLowerCase();
    let baseColors: string[] = [];
    
    if (moodKeywords.includes('happy') || moodKeywords.includes('joy') || moodKeywords.includes('excited')) {
      baseColors = ['#FFD93D', '#FF8C42', '#FF6B8A', '#51CF66'];
    } else if (moodKeywords.includes('sad') || moodKeywords.includes('depressed') || moodKeywords.includes('melancholy')) {
      baseColors = ['#6C5CE7', '#A29BFE', '#74B9FF', '#55A3FF'];
    } else if (moodKeywords.includes('angry') || moodKeywords.includes('frustrated') || moodKeywords.includes('irritated')) {
      baseColors = ['#FF6B6B', '#FF8C42', '#FFD93D', '#FF6B8A'];
    } else if (moodKeywords.includes('anxious') || moodKeywords.includes('worried') || moodKeywords.includes('nervous')) {
      baseColors = ['#FFD93D', '#FF8C42', '#FF6B8A', '#74B9FF'];
    } else if (moodKeywords.includes('calm') || moodKeywords.includes('peaceful') || moodKeywords.includes('serene')) {
      baseColors = ['#51CF66', '#74B9FF', '#A29BFE', '#6C5CE7'];
    } else {
      // Default palette
      baseColors = ['#FF6B8A', '#FFD93D', '#51CF66', '#74B9FF'];
    }

    // Adjust intensity
    const intensityFactor = parseInt(intensity) / 10;
    const adjustedColors = baseColors.map(color => adjustColorIntensity(color, intensityFactor));
    
    return {
      name: `Mood Palette - ${new Date().toLocaleDateString()}`,
      colors: adjustedColors,
      description: moodDescription,
      intensity: intensity
    };
  };

  const adjustColorIntensity = (color: string, intensity: number) => {
    // Simple color intensity adjustment
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const adjustedR = Math.min(255, Math.round(r * (0.5 + intensity * 0.5)));
    const adjustedG = Math.min(255, Math.round(g * (0.5 + intensity * 0.5)));
    const adjustedB = Math.min(255, Math.round(b * (0.5 + intensity * 0.5)));
    
    return `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`;
  };

  const displayMoodPalette = (palette: any) => {
    const container = document.getElementById('moodPalettesContainer');
    if (!container) return;
    
    const paletteHTML = `
      <div class="mood-palette-item">
        <div class="mood-palette-header">
          <h4 class="mood-palette-name">${palette.name}</h4>
          <button onclick="deletePalette(this)" class="mood-palette-delete">×</button>
        </div>
        <div class="mood-palette-colors">
          ${palette.colors.map((color: string) => `
            <div class="mood-color-swatch" style="background: ${color};"></div>
          `).join('')}
        </div>
        <div class="mood-palette-details">
          <div style="margin-bottom: 5px;"><strong>Mood:</strong> ${palette.description}</div>
          <div><strong>Intensity:</strong> ${palette.intensity}/10</div>
        </div>
      </div>
    `;
    
    container.innerHTML = paletteHTML + container.innerHTML;
  };

  // Plan access checking and promo code system
  const checkPlanAccess = () => {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return;
    }

    const subscriptionData = JSON.parse(localStorage.getItem('havenSubscription') || '{}');
    const userPlan = subscriptionData.plan || 'starter';
    const promoCodeData = localStorage.getItem('havenPromoCodeData');
    
    // Check if user has a valid promo code (within 30 days)
    let hasValidPromoCode = false;
    if (promoCodeData) {
      try {
        const promoData = JSON.parse(promoCodeData);
        const currentTime = new Date().getTime();
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        
        // Check if promo code is still valid (within 30 days)
        if (currentTime - promoData.timestamp < thirtyDaysInMs) {
          hasValidPromoCode = true;
        } else {
          // Promo code expired, remove it
          localStorage.removeItem('havenPromoCodeData');
        }
      } catch (e) {
        // Invalid data, remove it
        localStorage.removeItem('havenPromoCodeData');
      }
    }
    
    // Allow access if user has valid promo code or is on Regular+ plan
    if (userPlan === 'starter' && !hasValidPromoCode) {
      const overlay = document.getElementById('planUpgradeOverlay');
      if (overlay) overlay.style.display = 'flex';
      // Hide journal content
      document.querySelectorAll('.section').forEach(section => {
        (section as HTMLElement).style.display = 'none';
      });
    } else {
      // Show journal content and hide popup
      const overlay = document.getElementById('planUpgradeOverlay');
      if (overlay) overlay.style.display = 'none';
      document.querySelectorAll('.section').forEach(section => {
        (section as HTMLElement).style.display = 'block';
      });
    }
  };

  const applyPromoCodeFromInput = () => {
    const promoCodeInput = document.getElementById('promoCodeInput') as HTMLInputElement;
    const promoCode = promoCodeInput?.value;
    
    if (!promoCode || promoCode.trim() === '') {
      alert('Please enter a promo code.');
      return;
    }

    const enteredCode = promoCode.trim().toUpperCase();
    
    // Check if it's the BETA30 code
    if (enteredCode === 'BETA30') {
      // Store promo code with timestamp for 30-day validation
      const promoData = {
        code: enteredCode,
        timestamp: new Date().getTime()
      };
      localStorage.setItem('havenPromoCodeData', JSON.stringify(promoData));
      checkPlanAccess();
      alert('Promo code BETA30 applied! You now have access to the Journal for 30 days.');
      if (promoCodeInput) promoCodeInput.value = ''; // Clear the input
    } else {
      alert('Invalid promo code. Please try again.');
      if (promoCodeInput) promoCodeInput.value = ''; // Clear the input
    }
  };

  const applyPromoCode = () => {
    const promoCode = prompt('Enter promo code:');
    if (promoCode && promoCode.trim() !== '') {
      const enteredCode = promoCode.trim().toUpperCase();
      
      // Check if it's the BETA30 code
      if (enteredCode === 'BETA30') {
        // Store promo code with timestamp for 30-day validation
        const promoData = {
          code: enteredCode,
          timestamp: new Date().getTime()
        };
        localStorage.setItem('havenPromoCodeData', JSON.stringify(promoData));
        checkPlanAccess();
        alert('Promo code BETA30 applied! You now have access to the Journal for 30 days.');
      } else {
        alert('Invalid promo code. Please try again.');
      }
    }
  };

  // Upgrade to Regular plan
  const upgradeToRegular = async () => {
    try {
      console.log('Upgrading to Regular plan');
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planType: 'regular' })
      });

      const data = await response.json();
      
      if (data.error) {
        console.error('Checkout error:', data.error);
        alert('Unable to start checkout. Please try again.');
        return;
      }

      if (data.mock) {
        alert('Payment system is in demo mode. Redirecting to success page for testing.');
        // Redirect to success page for demo
        window.location.href = data.url;
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  // Initialize everything when component mounts
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return;
    }

    // Load existing entries
    loadJournalEntries();
    
    // Load compassion practice progress
    loadCompassionProgress();
    
    // Load emotional insights from chat data
    loadEmotionalInsights();
    
    // Initialize calendar
    renderSimpleCalendar();
    
    // Populate the calendar grid
    populateCalendarGrid();
    
    // Check plan access
    checkPlanAccess();
    
    // Add event listener for Enter key on promo code input
    const promoCodeInput = document.getElementById('promoCodeInput');
    if (promoCodeInput) {
      promoCodeInput.addEventListener('keypress', function(e: KeyboardEvent) {
        if (e.key === 'Enter') {
          applyPromoCodeFromInput();
        }
      });
    }
  }, []);

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
            background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 25%, #FF9A8B 50%, #E8447A 75%, #FF8C42 100%);
            min-height: 100vh;
            color: #333;
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
            padding: 30px 20px;
            border-radius: 15px;
        }

        .header h1 {
            color: white;
            font-size: 1.8em;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .header p {
            color: white;
            font-size: 1.1em;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            opacity: 0.9;
        }

        .section {
            background: white;
            border-radius: 15px;
            padding: 25px 25px 100px 25px;
            margin-bottom: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .section h2 {
            color: #FF6B8A;
            font-size: 1.4rem;
            font-weight: bold;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-icon {
            font-size: 1.2em;
        }

        /* Insights Grid */
        .insights-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .insight-card {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }

        .insight-icon {
            width: 48px;
            height: 48px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
            border-radius: 50%;
            margin: 0 auto 15px;
        }

        .insight-icon svg {
            width: 24px;
            height: 24px;
            fill: white;
        }

        .insight-title {
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
        }

        .insight-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #FF6B8A;
            margin-bottom: 5px;
        }

        .insight-description {
            font-size: 0.9rem;
            color: #666;
        }

        /* Mood Grid */
        .mood-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }

        .mood-item {
            text-align: center;
            cursor: pointer;
            padding: 15px;
            border-radius: 12px;
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .mood-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .mood-item.selected {
            border-color: #FF6B8A;
            background: #fff5f7;
        }

        .mood-icon {
            width: 40px;
            height: 40px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .mood-label {
            font-size: 0.9rem;
            color: #666;
        }

        .mood-item.selected .mood-label {
            color: #FF6B8A;
            font-weight: bold;
        }

        /* Mood Input */
        .mood-input-section {
            margin-bottom: 25px;
        }

        .mood-input-label {
            color: #333;
            font-weight: 600;
            margin-bottom: 10px;
            display: block;
        }

        .mood-textarea {
            width: 100%;
            min-height: 100px;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 1em;
            font-family: inherit;
            resize: vertical;
            background: #f8f9fa;
        }

        .mood-textarea:focus {
            outline: none;
            border-color: #FF6B8A;
            background: white;
        }

        /* Intensity Slider */
        .intensity-section {
            margin-bottom: 25px;
        }

        .intensity-label {
            color: #333;
            font-weight: 600;
            margin-bottom: 10px;
            display: block;
        }

        .intensity-slider {
            width: 100%;
            height: 8px;
            border-radius: 4px;
            background: linear-gradient(to right, #ff6b6b 0%, #ffd93d 50%, #51cf66 100%);
            outline: none;
            -webkit-appearance: none;
        }

        .intensity-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid #FF6B8A;
            cursor: pointer;
        }

        .intensity-labels {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            font-size: 0.85em;
            color: #666;
        }

        /* Reflection Input */
        .reflection-input {
          width: 100%;
          min-height: 500px;
          padding: 40px;
          border: 2px solid #e0e0e0;
          border-radius: 0;
          font-size: 18px;
          line-height: 2.0;
          resize: vertical;
          transition: all 0.3s;
          font-family: 'Caveat', 'Comic Sans MS', cursive, sans-serif;
          background: #fefefe;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
          background-image:
            linear-gradient(#f8f8f8 1px, transparent 1px),
            linear-gradient(90deg, #f8f8f8 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: 0 0, 0 0;
        }

        .reflection-input:focus {
          outline: none;
          border-color: #FF6B8A;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.1), 0 0 0 3px rgba(255, 107, 138, 0.1);
        }

        .save-btn {
            background: #FF6B8A;
            color: white;
            border: none;
          padding: 12px 24px;
            border-radius: 25px;
          font-weight: bold;
            cursor: pointer;
          transition: all 0.3s;
          margin-top: 15px;
        }

        .save-btn:hover {
            background: #e55a7a;
            transform: translateY(-2px);
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

        /* Growth Patterns Section */
        .growth-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .growth-card {
            background: #f8f9fa;
            border-radius: 12px;
          padding: 20px;
            text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .growth-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 15px;
            display: flex;
            align-items: center;
            justify-content: center;
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          border-radius: 50%;
        }

        .growth-icon svg {
          width: 30px;
          height: 30px;
          fill: white;
        }

        .growth-card h3 {
          color: #FF6B8A;
          font-size: 1.2rem;
          margin-bottom: 8px;
        }

        .growth-card p {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        /* Calendar Styles */
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .calendar-nav {
            display: flex;
            gap: 10px;
        }

        .nav-btn {
            background: #FF6B8A;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }

        .nav-btn:hover {
            background: #e55a7a;
            transform: translateY(-1px);
        }

        .current-month {
            font-size: 1.5em;
            font-weight: bold;
            color: #333;
        }

        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            grid-template-rows: repeat(6, 1fr);
            gap: 8px;
            background: #f8f9fa;
            border-radius: 10px;
            padding: 15px;
            min-height: 300px;
            max-height: 400px;
        }

        .calendar-weekday {
            background: #FF6B8A;
            color: white;
            padding: 15px 10px;
            text-align: center;
            font-weight: bold;
            font-size: 0.9em;
            border-radius: 8px;
        }

        .calendar-day {
            background: white;
            border: 2px solid #e9ecef;
            padding: 27px 14px;
            text-align: center;
            cursor: pointer;
            font-weight: bold;
            font-size: 1.5em;
            border-radius: 8px;
            transition: all 0.3s;
            min-height: 81px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .calendar-day:hover {
            background: #f8f9fa;
            border-color: #FF6B8A;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 107, 138, 0.2);
        }

        .calendar-day.empty {
            background: transparent;
            border: none;
            cursor: default;
        }

        .calendar-day.empty:hover {
            background: transparent;
            border: none;
            transform: none;
            box-shadow: none;
        }

        .calendar-day.today {
            border-color: #FFD93D;
            border-width: 3px;
            box-shadow: 0 0 0 2px rgba(255, 217, 61, 0.3);
        }

        .mood-legend {
            margin-top: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9em;
        }

        .legend-color {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            border: 2px solid #e9ecef;
        }

        /* Self-Compassion Practice Styles */
        .practice-checklists-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }

        .practice-checklist {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 25px;
            border: 2px solid #e9ecef;
        }

        .practice-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
        }

        .practice-icon {
            font-size: 2em;
        }

        .practice-title {
            font-size: 1.3em;
            font-weight: bold;
            color: #FF6B8A;
        }

        .practice-description {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.5;
        }

        .checklist-item {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 8px;
            transition: background 0.3s;
        }

        .checklist-item:hover {
            background: #e9ecef;
        }

        .checklist-checkbox {
            width: 20px;
            height: 20px;
            accent-color: #FF6B8A;
        }

        .checklist-label {
            flex: 1;
            color: #333;
            line-height: 1.4;
        }

        .practice-progress {
            margin-top: 20px;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 8px;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
            transition: width 0.3s ease;
        }

        .progress-text {
            text-align: center;
            color: #666;
            font-size: 0.9em;
        }

        /* Enhanced Emotional Palette Styles */
        .enhanced-emotional-palette-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 20px;
        }

        .color-guide {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 25px;
            border: 2px solid #e9ecef;
        }

        .color-guide h3 {
            color: #FF6B8A;
            margin-bottom: 15px;
            text-align: center;
        }

        .color-guide-grid {
            display: grid;
            gap: 15px;
        }

        .color-guide-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .color-guide-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
        }

        .color-guide-swatch {
            width: 30px;
            height: 30px;
            border-radius: 6px;
        }

        .enhanced-emotional-process {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 25px;
            border: 2px solid #e9ecef;
        }

        .process-explanation {
            margin-bottom: 25px;
            text-align: center;
            color: #666;
            line-height: 1.6;
        }

        .mood-input-section,
        .intensity-section,
        .calendar-link-section {
            margin-bottom: 25px;
        }

        .mood-input-label,
        .intensity-label {
            color: #333;
            font-weight: 600;
            margin-bottom: 15px;
            display: block;
        }

        .intensity-buttons {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin-bottom: 15px;
        }

        .intensity-btn {
            background: white;
            border: 2px solid #e9ecef;
            padding: 12px 8px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.9em;
        }

        .intensity-btn:hover,
        .intensity-btn.selected {
            background: #FF6B8A;
            color: white;
            border-color: #FF6B8A;
        }

        .calendar-link-btn {
            background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
        }

        .calendar-link-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 138, 0.3);
        }

        .calendar-link-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        /* Gratitude Glow-Up Styles */
        .gratitude-section {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            border-radius: 20px;
            padding: 30px;
            border: 2px solid #e9ecef;
            margin-top: 30px;
        }

        .gratitude-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }

        .gratitude-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            padding: 25px;
            border-radius: 20px;
            text-align: center;
            border: 2px solid #e9ecef;
            transition: all 0.4s ease;
        }

        .gratitude-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .gratitude-icon {
            font-size: 40px;
            margin-bottom: 15px;
            display: block;
        }

        .gratitude-title {
            font-weight: bold;
            margin-bottom: 15px;
            color: #FF6B8A;
            font-size: 18px;
        }

        .gratitude-description {
            font-size: 14px;
            margin-bottom: 15px;
            color: #636e72;
        }

        .gratitude-input {
            width: 100%;
            padding: 15px;
            border: 2px solid #e9ecef;
            border-radius: 15px;
            font-size: 14px;
            margin-top: 10px;
            transition: all 0.3s ease;
            background: #f8f9fa;
        }

        .gratitude-input:focus {
            outline: none;
            border-color: #FF6B8A;
            background: white;
        }

        .gratitude-textarea {
            width: 100%;
            padding: 20px;
            border: 2px solid #e9ecef;
            border-radius: 20px;
            font-size: 16px;
            min-height: 120px;
            resize: vertical;
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            color: #2d3436;
            font-family: inherit;
            line-height: 1.6;
            transition: all 0.3s ease;
        }

        .gratitude-textarea:focus {
            outline: none;
            border-color: #FF6B8A;
        }

        .mood-energy-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }

        .mood-energy-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            padding: 25px;
            border-radius: 20px;
            border: 2px solid #e9ecef;
            transition: all 0.3s ease;
        }

        .mood-energy-card h3 {
            font-weight: bold;
            margin-bottom: 20px;
            color: #FF6B8A;
            font-size: 18px;
            text-align: center;
        }

        .mood-option,
        .energy-option,
        .gratitude-option {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            padding: 15px 10px;
            border-radius: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid #e9ecef;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 10px;
        }

        .mood-option:hover,
        .energy-option:hover,
        .gratitude-option:hover,
        .mood-option.selected,
        .energy-option.selected,
        .gratitude-option.selected {
            background: #FF6B8A;
            color: white;
            border-color: #FF6B8A;
            transform: scale(1.05);
        }

        .glow-up-practices {
            background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 50%, #FF9A8B 100%);
            color: white;
            border-radius: 25px;
            padding: 35px;
            margin-top: 40px;
        }

        .glow-up-practices h3 {
            margin-bottom: 20px;
            text-align: center;
            font-size: 28px;
        }

        .glow-up-practices p {
            text-align: center;
            margin-bottom: 25px;
            font-style: italic;
        }

        .practice-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .practice-item {
            background: rgba(255, 255, 255, 0.15);
            padding: 25px;
            border-radius: 20px;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .practice-item:hover {
            transform: scale(1.02);
            background: rgba(255, 255, 255, 0.25);
        }

        .practice-item-icon {
            font-size: 32px;
            margin-bottom: 15px;
            display: block;
        }

        .practice-item-title {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 16px;
        }

        .practice-item-description {
            font-size: 14px;
            margin-bottom: 10px;
        }

        .practice-btn {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 15px;
            transition: all 0.3s ease;
            font-weight: bold;
            backdrop-filter: blur(5px);
        }

        .practice-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.05);
        }

        .gratitude-actions {
            text-align: center;
            margin-top: 40px;
        }

        .gratitude-action-btn {
            background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
            color: white;
            border: none;
            padding: 20px 50px;
            border-radius: 35px;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.4s ease;
            box-shadow: 0 10px 30px rgba(255, 107, 138, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-right: 10px;
            margin-bottom: 15px;
            display: inline-block;
        }

        .gratitude-action-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(255, 107, 138, 0.4);
        }

        .gratitude-action-btn.secondary {
            background: linear-gradient(135deg, #FF8C42 0%, #FFD93D 100%);
            box-shadow: 0 10px 30px rgba(255, 140, 66, 0.3);
        }

        .gratitude-action-btn.secondary:hover {
            box-shadow: 0 15px 35px rgba(255, 140, 66, 0.4);
        }

        .gratitude-action-btn.tertiary {
            background: linear-gradient(135deg, #FF9A8B 0%, #FFD93D 100%);
            box-shadow: 0 10px 30px rgba(255, 154, 139, 0.3);
        }

        .gratitude-action-btn.tertiary:hover {
            box-shadow: 0 15px 35px rgba(255, 154, 139, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .insights-grid {
                grid-template-columns: 1fr;
            }

            .mood-grid {
                grid-template-columns: repeat(3, 1fr);
            }

            .practice-checklists-grid {
                grid-template-columns: 1fr;
            }

            .enhanced-emotional-palette-container {
                grid-template-columns: 1fr;
            }

            .gratitude-grid {
                grid-template-columns: 1fr;
            }

            .mood-energy-grid {
                grid-template-columns: 1fr;
            }

            .practice-grid {
                grid-template-columns: 1fr;
            }

            .gratitude-action-btn {
                width: 100%;
                margin-right: 0;
            }
        }

        /* Filter Buttons and Entry Filters */
        .entry-filters {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .filter-btn {
            background: white;
            border: 2px solid #e9ecef;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.9em;
            color: #666;
        }

        .filter-btn:hover,
        .filter-btn.active {
            background: #FF6B8A;
            color: white;
            border-color: #FF6B8A;
            transform: translateY(-2px);
        }

        /* Badge Display Styles */
        .compassion-badge-display {
            background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 20px;
            text-align: center;
        }

        .badge-earned-notification {
            display: flex;
            align-items: center;
            gap: 15px;
            justify-content: center;
        }

        .badge-icon {
            font-size: 2em;
        }

        .badge-content {
            text-align: left;
        }

        .badge-title {
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 5px;
        }

        .badge-description {
            font-size: 0.9em;
            opacity: 0.9;
        }

        /* Section Subtitle */
        .section-subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 25px;
            font-style: italic;
            font-size: 1.1em;
        }

        /* Plan Upgrade Overlay Styles */
        .plan-upgrade-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .plan-upgrade-content {
          background: white;
          padding: 40px;
          border-radius: 20px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .plan-upgrade-content h2 {
          color: #FF6B8A;
          margin-bottom: 20px;
          font-size: 2em;
        }

        .promo-code-section {
          margin: 30px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 15px;
        }

        .promo-code-section h3 {
          color: #FF8C42;
          margin-bottom: 15px;
        }

        .promo-input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .promo-code-input {
          flex: 1;
          padding: 12px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 16px;
        }

        .promo-code-btn {
          padding: 12px 20px;
          background: #FF6B8A;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }

        .promo-hint {
          color: #666;
          font-size: 0.9em;
          font-style: italic;
        }

        .upgrade-options {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin: 30px 0;
        }

        .upgrade-btn {
          padding: 15px 30px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          transition: transform 0.2s;
        }

        .upgrade-btn:hover {
          transform: translateY(-2px);
        }

        .upgrade-btn.primary {
          background: linear-gradient(135deg, #FF6B8A 0%, #FFD93D 100%);
          color: white;
        }

        .upgrade-btn.secondary {
          background: #f8f9fa;
          color: #333;
          border: 2px solid #e9ecef;
        }

        .plan-features {
          text-align: left;
          margin-top: 30px;
        }

        .plan-features h3 {
          color: #333;
          margin-bottom: 15px;
        }

        .plan-features ul {
          list-style: none;
          padding: 0;
        }

        .plan-features li {
          padding: 8px 0;
          color: #666;
        }

        /* Journal Entries Styles */
        .entries-list {
          margin-top: 20px;
        }

        .entry-item {
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 15px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .entry-date {
          color: #666;
          font-size: 0.9em;
        }

        .entry-mood {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .entry-mood-emoji {
          font-size: 1.2em;
        }

        .entry-mood-label {
          color: #333;
          font-weight: 500;
        }

        .entry-content {
          color: #333;
          font-style: italic;
          line-height: 1.6;
        }

        /* Mood Palette Styles */
        .mood-palette-item {
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .mood-palette-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .mood-palette-name {
          color: #333;
          margin: 0;
        }

        .mood-palette-delete {
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          font-size: 18px;
          line-height: 1;
        }

        .mood-palette-colors {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .mood-color-swatch {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #e9ecef;
        }

        .mood-palette-details {
          color: #666;
          font-size: 0.9em;
        }
      `}</style>

      <div className="container">
        <div className="header">
          <h1>📝 Journal</h1>
          <p>Reflect, grow, and track your emotional journey with Haven</p>
        </div>

        {/* Insights Section */}
        <div className="section">
          <h2><span className="section-icon">📊</span>Your Journal Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
              <div className="insight-title">Total Entries</div>
              <div className="insight-value">{insights.totalEntries || 0}</div>
              <div className="insight-description">Journal entries created</div>
                </div>
            
            <div className="insight-card">
              <div className="insight-icon">
                        <svg viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                        </svg>
                    </div>
              <div className="insight-title">This Month</div>
              <div className="insight-value">{insights.monthlyEntries || 0}</div>
              <div className="insight-description">Entries this month</div>
                </div>
            
            <div className="insight-card">
              <div className="insight-icon">
                        <svg viewBox="0 0 24 24">
                  <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.5-2.5l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2l1.3-2.8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.5-2.5l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2l1.3-2.8z"/>
                        </svg>
                    </div>
              <div className="insight-title">Current Streak</div>
              <div className="insight-value">{insights.streak || 0}</div>
              <div className="insight-description">Days in a row</div>
                </div>
            
            <div className="insight-card">
              <div className="insight-icon">
                        <svg viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                    </div>
              <div className="insight-title">Average Mood</div>
              <div className="insight-value">{insights.averageMood || 0}/10</div>
              <div className="insight-description">Mood rating</div>
                </div>
            </div>
        </div>

        {/* Mood Tracking Section */}
        <div className="section">
          <h2><span className="section-icon">😊</span>How are you feeling today?</h2>
          
          <div className="mood-grid">
            {moodOptions.map((mood) => (
              <div
                key={mood.value}
                className={`mood-item ${selectedMood === mood.value ? 'selected' : ''}`}
                onClick={() => setSelectedMood(mood.value)}
              >
                <div className="mood-icon">{mood.icon}</div>
                <div className="mood-label">{mood.label}</div>
                        </div>
            ))}
        </div>

          <div className="intensity-section">
            <label className="intensity-label">Mood Intensity: {moodIntensity}/10</label>
            <input
              type="range"
              min="1"
              max="10"
              value={moodIntensity}
              onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
              className="intensity-slider"
            />
            <div className="intensity-labels">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
                        </div>
                    </div>

          <div className="mood-input-section">
            <label className="mood-input-label">Tell us more about your mood:</label>
            <textarea
              className="mood-textarea"
              placeholder="Describe what's contributing to your current emotional state..."
              value={moodText}
              onChange={(e) => setMoodText(e.target.value)}
            />
                    </div>
                </div>

        {/* Reflection Section */}
        <div className="section">
          <h2><span className="section-icon">✍️</span>Daily Reflection</h2>
          <p style={{marginBottom: '20px', color: '#666'}}>
            Take a moment to reflect on your day. What went well? What challenged you? What are you grateful for?
          </p>
          
          <textarea
            ref={reflectionInputRef}
            className="reflection-input"
            placeholder="Start writing your reflection here..."
          />
          
          <button className="save-btn" onClick={saveJournalEntry}>
            💾 Save Journal Entry
          </button>
          
          <button 
            className="save-btn" 
            onClick={shareJournalEntry}
            style={{marginLeft: '15px', background: '#FFD93D', color: '#333'}}
          >
            🌟 Share Entry
                        </button>
        </div>

        {/* Growth Patterns Section */}
        <div className="section">
          <h2><span className="section-icon">🌱</span>Growth Patterns</h2>
          <p style={{marginBottom: '20px', color: '#666', textAlign: 'center'}}>
            Start your journey with Haven to discover your growth patterns
          </p>
          
          <div className="growth-grid">
            <div className="growth-card">
              <div className="growth-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
    </div>
              <h3>Emotional Insights</h3>
              <p>Track your emotional journey and discover patterns</p>
                </div>

            <div className="growth-card">
              <div className="growth-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.5-2.5l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2l1.3-2.8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.5-2.5l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2l1.3-2.8z"/>
                </svg>
            </div>
              <h3>Strength Discovery</h3>
              <p>Your strengths will emerge as you engage with Haven</p>
        </div>

            <div className="growth-card">
              <div className="growth-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                    </div>
              <h3>Next Growth Edge</h3>
              <p>Begin conversations to identify your next growth opportunities</p>
                    </div>
                    
            <div className="growth-card">
              <div className="growth-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                    </div>
              <h3>Learning Trend</h3>
              <p>Your emotional patterns will be analyzed as you continue your journey</p>
                </div>
                        </div>
                    </div>

        {/* Emotional Insights Section */}
        <div className="section">
          <h2><span className="section-icon">📊</span>Emotional Insights</h2>
          <div className="insights-grid" id="adding-insights-container">
            <div className="insight-card">
              <div className="insight-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="insight-title">Growth Pattern</div>
              <div className="insight-value" id="adding-growth-pattern">Loading...</div>
              <div className="insight-description" id="adding-growth-description">Analyzing your additions...</div>
            </div>
            <div className="insight-card">
              <div className="insight-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="insight-title">Strength Discovery</div>
              <div className="insight-value" id="adding-strength-discovery">Loading...</div>
              <div className="insight-description" id="adding-strength-description">Discovering your learning strengths...</div>
            </div>
            <div className="insight-card">
              <div className="insight-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="insight-title">Next Growth Edge</div>
              <div className="insight-value" id="adding-next-growth-edge">Loading...</div>
              <div className="insight-description" id="adding-next-growth-description">Identifying new opportunities...</div>
            </div>
            <div className="insight-card">
              <div className="insight-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="insight-title">Learning Trend</div>
              <div className="insight-value" id="adding-learning-trend">Loading...</div>
              <div className="insight-description" id="adding-learning-trend-description">Analyzing your learning patterns...</div>
            </div>
          </div>
        </div>

        {/* Self-Compassion Practice Section */}
        <div className="section">
          <h2><span className="section-icon">💝</span>Self-Compassion Practice</h2>
          
          {/* Badge Recognition Display */}
          <div className="compassion-badge-display" id="compassionBadgeDisplay" style={{ display: 'none' }}>
            <div className="badge-earned-notification">
              <div className="badge-icon">🏆</div>
              <div className="badge-content">
                <div className="badge-title">Self-Compassion Champion</div>
                <div className="badge-description">You've completed your self-compassion practice!</div>
              </div>
            </div>
          </div>

          <div className="practice-checklists-grid">
            <div className="practice-checklist">
              <div className="practice-header">
                <div className="practice-icon">💝</div>
                <div className="practice-title">Mindful Self-Compassion</div>
              </div>
              <div className="practice-description">
                Practice self-compassion by acknowledging your feelings and treating yourself with kindness.
              </div>
              <ul>
                <li className="checklist-item">
                  <input type="checkbox" id="mindfulSelfCompassion1" className="checklist-checkbox" onChange={updateCompassionProgress} />
                  <label htmlFor="mindfulSelfCompassion1" className="checklist-label">Notice negative self-talk and replace with kind words</label>
                </li>
                <li className="checklist-item">
                  <input type="checkbox" id="mindfulSelfCompassion2" className="checklist-checkbox" onChange={updateCompassionProgress} />
                  <label htmlFor="mindfulSelfCompassion2" className="checklist-label">Practice self-forgiveness for today's mistakes</label>
                </li>
                <li className="checklist-item">
                  <input type="checkbox" id="mindfulSelfCompassion3" className="checklist-checkbox" onChange={updateCompassionProgress} />
                  <label htmlFor="mindfulSelfCompassion3" className="checklist-label">Write down 3 things you appreciate about yourself</label>
                </li>
                <li className="checklist-item">
                  <input type="checkbox" id="mindfulSelfCompassion4" className="checklist-checkbox" onChange={updateCompassionProgress} />
                  <label htmlFor="mindfulSelfCompassion4" className="checklist-label">Take a moment to acknowledge your feelings without judgment</label>
                </li>
                <li className="checklist-item">
                  <input type="checkbox" id="mindfulSelfCompassion5" className="checklist-checkbox" onChange={updateCompassionProgress} />
                  <label htmlFor="mindfulSelfCompassion5" className="checklist-label">Do something kind for yourself today</label>
                </li>
              </ul>
              <div className="practice-progress">
                <div className="progress-bar">
                  <div className="progress-fill" id="compassionProgressFill" style={{ width: `${compassionProgress}%` }}></div>
                </div>
                <div className="progress-text" id="compassionProgressText">{compassionProgress}% completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Emotional Palette Section */}
        <div className="section">
          <h2><span className="section-icon">🎨</span>Your Emotional Palette</h2>
          <p className="section-subtitle">Transform your feelings into colors and discover what your emotions look like</p>
          
          <div className="enhanced-emotional-palette-container">
            {/* Color Guide */}
            <div className="color-guide">
              <h3>Color Guide</h3>
              <p style={{textAlign: 'center', color: '#666', marginBottom: '15px', fontSize: '0.9em'}}>Click any color to select it</p>
              <div className="color-guide-grid">
                <div className="color-guide-item" onClick={() => selectMoodColor('joyful', '#E8447A', '🩷', 'Joyful')}>
                  <div className="color-guide-swatch" style={{background: '#E8447A'}}></div>
                  <span>🩷 Dark Pink = Joyful feelings</span>
                </div>
                <div className="color-guide-item" onClick={() => selectMoodColor('happy', '#FFD93D', '🟡', 'Happy')}>
                  <div className="color-guide-swatch" style={{background: '#FFD93D'}}></div>
                  <span>🟡 Yellow = Happy, optimistic emotions</span>
                </div>
                <div className="color-guide-item" onClick={() => selectMoodColor('excited', '#FF8C42', '🟠', 'Excited')}>
                  <div className="color-guide-swatch" style={{background: '#FF8C42'}}></div>
                  <span>🟠 Orange = Excited, energized states</span>
                </div>
                <div className="color-guide-item" onClick={() => selectMoodColor('calm', '#87CEEB', '🔵', 'Calm')}>
                  <div className="color-guide-swatch" style={{background: '#87CEEB'}}></div>
                  <span>🔵 Light Blue = Calm, peaceful moods</span>
                </div>
                <div className="color-guide-item" onClick={() => selectMoodColor('neutral', '#D3D3D3', '⚪', 'Neutral')}>
                  <div className="color-guide-swatch" style={{background: '#D3D3D3'}}></div>
                  <span>⚪ Gray = Neutral, balanced feelings</span>
                </div>
                <div className="color-guide-item" onClick={() => selectMoodColor('sad', '#8B4513', '🟤', 'Sad')}>
                  <div className="color-guide-swatch" style={{background: '#8B4513'}}></div>
                  <span>🟤 Brown = Sad, heavy emotions</span>
                </div>
                <div className="color-guide-item" onClick={() => selectMoodColor('anxious', '#2F4F4F', '🔘', 'Anxious')}>
                  <div className="color-guide-swatch" style={{background: '#2F4F4F'}}></div>
                  <span>🔘 Dark Grey-Blue = Anxious, worried energy</span>
                </div>
                <div className="color-guide-item" onClick={() => selectMoodColor('angry', '#FF0000', '🔴', 'Angry')}>
                  <div className="color-guide-swatch" style={{background: '#FF0000'}}></div>
                  <span>🔴 Red = Angry, intense feelings</span>
                </div>
              </div>
            </div>

            {/* Process */}
            <div className="enhanced-emotional-process">
              <div className="process-explanation">
                <p>Sometimes we feel emotions we can't name. Colors help your subconscious speak when words aren't enough. Your emotional palette is like a mood ring for your inner world.</p>
              </div>

              {/* Step 1: Color Selection */}
              <div className="mood-input-section">
                <label className="mood-input-label">Step 1: Click any mood color above</label>
                <div id="selectedMoodDisplay" style={{textAlign: 'center', color: '#666', fontSize: '0.9em', marginTop: '10px'}}>
                  {selectedMoodColor ? `${selectedMoodColor.emoji} ${selectedMoodColor.label}` : 'No mood selected yet'}
                </div>
              </div>

              {/* Step 2: Intensity Selection */}
              <div className="intensity-section">
                <label className="intensity-label">Step 2: Choose intensity level</label>
                <div className="intensity-buttons">
                  {[1, 2, 3, 4, 5].map(intensity => (
                    <button 
                      key={intensity}
                      className={`intensity-btn ${selectedIntensity === intensity ? 'selected' : ''}`}
                      onClick={() => selectIntensity(intensity)}
                    >
                      {intensity} - {intensity === 1 ? 'Subtle' : intensity === 2 ? 'Light' : intensity === 3 ? 'Medium' : intensity === 4 ? 'Strong' : 'Intense'}
                    </button>
                  ))}
                </div>
                <div id="selectedIntensityDisplay" style={{textAlign: 'center', color: '#666', fontSize: '0.9em', marginTop: '10px'}}>
                  {selectedIntensity > 0 ? `Intensity: ${selectedIntensity}` : 'No intensity selected'}
                </div>
              </div>

              {/* Step 3: Add to Calendar Button */}
              <div className="calendar-link-section">
                <button 
                  id="addToCalendarBtn" 
                  className="calendar-link-btn" 
                  onClick={addToCalendar} 
                  disabled={!selectedMoodColor || selectedIntensity === 0}
                >
                  📅 Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Mood & Recent Entries Section */}
        <div className="section">
          <h2><span className="section-icon">😊</span>Today's Mood & Recent Entries</h2>
          <div className="mood-grid">
            <div className="mood-item" onClick={(e) => selectMoodAndLinkToCalendar('excited', e.currentTarget)}>
              <div className="mood-icon">😊</div>
              <div className="mood-label">Happy</div>
            </div>
            <div className="mood-item" onClick={(e) => selectMoodAndLinkToCalendar('calm', e.currentTarget)}>
              <div className="mood-icon">😌</div>
              <div className="mood-label">Calm</div>
            </div>
            <div className="mood-item" onClick={(e) => selectMoodAndLinkToCalendar('neutral', e.currentTarget)}>
              <div className="mood-icon">😐</div>
              <div className="mood-label">Neutral</div>
            </div>
            <div className="mood-item" onClick={(e) => selectMoodAndLinkToCalendar('anxious', e.currentTarget)}>
              <div className="mood-icon">😰</div>
              <div className="mood-label">Anxious</div>
            </div>
            <div className="mood-item" onClick={(e) => selectMoodAndLinkToCalendar('sad', e.currentTarget)}>
              <div className="mood-icon">😔</div>
              <div className="mood-label">Sad</div>
            </div>
          </div>
          <div className="entry-filters">
            <button className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => filterEntries('all')}>All</button>
            <button className={`filter-btn ${currentFilter === 'happy' ? 'active' : ''}`} onClick={() => filterEntries('happy')}>Happy</button>
            <button className={`filter-btn ${currentFilter === 'calm' ? 'active' : ''}`} onClick={() => filterEntries('calm')}>Calm</button>
            <button className={`filter-btn ${currentFilter === 'anxious' ? 'active' : ''}`} onClick={() => filterEntries('anxious')}>Anxious</button>
            <button className={`filter-btn ${currentFilter === 'sad' ? 'active' : ''}`} onClick={() => filterEntries('sad')}>Sad</button>
          </div>
          <div id="entriesList">
            {/* Recent entries will be loaded here */}
          </div>
        </div>

        {/* Simple Calendar Section */}
        <div className="section">
          <h2><span className="section-icon">📆</span>Simple Calendar</h2>
          
          {/* Test Buttons */}
          <div style={{marginBottom: '20px', textAlign: 'center'}}>
            <button onClick={testMoodSystem} style={{margin: '5px', padding: '8px 16px', background: '#FF6B8A', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
              🧪 Test Mood System
            </button>
            <button onClick={testCalendar} style={{margin: '5px', padding: '8px 16px', background: '#FFD93D', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
              🔍 Test Calendar
            </button>
            <button onClick={viewSavedJournals} style={{margin: '5px', padding: '8px 16px', background: '#87CEEB', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
              📖 View Saved Journals
            </button>
          </div>
          
          <div id="simple-calendar-container">
            <div className="calendar-header">
              <div className="calendar-nav">
                <button className="nav-btn" onClick={previousMonthSimple}>‹</button>
                <div className="current-month">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <button className="nav-btn" onClick={nextMonthSimple}>›</button>
              </div>
            </div>
            <div className="calendar-grid">
              {/* Calendar will be populated by JavaScript */}
            </div>
          </div>
          <div className="mood-legend" style={{marginTop: '200px'}}>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#E8447A'}}></div>
              <span>Joyful</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#FF9A8B'}}></div>
              <span>Happy</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#FFD93D'}}></div>
              <span>Excited</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#87CEEB'}}></div>
              <span>Calm</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#D3D3D3'}}></div>
              <span>Neutral</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#8B4513'}}></div>
              <span>Sad</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#2F4F4F'}}></div>
              <span>Anxious</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#FF0000'}}></div>
              <span>Angry</span>
            </div>
          </div>
        </div>

        {/* Gratitude Glow-Up Section */}
        <div className="section gratitude-section">
          <h2><span className="section-icon">✨</span>Gratitude Glow-Up</h2>
          <p>Your daily dose of good vibes and appreciation ✨</p>
          
          {/* GRATITUDE GENERATOR */}
          <div style={{marginTop: '30px'}}>
            <h3 style={{color: '#FF6B8A', marginBottom: '20px', textAlign: 'center'}}>✨ Gratitude Generator</h3>
            <p style={{textAlign: 'center', marginBottom: '25px', color: '#636e72', fontStyle: 'italic'}}>What's sparking joy in your world today?</p>
            
            <div className="gratitude-grid">
              <div className="gratitude-card">
                <span className="gratitude-icon">🌅</span>
                <div className="gratitude-title">Morning Magic</div>
                <p className="gratitude-description">What made this morning special?</p>
                <input 
                  type="text" 
                  placeholder="First sip of coffee, sunrise vibes, cozy bed..." 
                  className="gratitude-input"
                  value={gratitudeData.morningMagic}
                  onChange={(e) => setGratitudeData(prev => ({...prev, morningMagic: e.target.value}))}
                />
              </div>
              
              <div className="gratitude-card">
                <span className="gratitude-icon">💝</span>
                <div className="gratitude-title">People Power</div>
                <p className="gratitude-description">Who brought good energy today?</p>
                <input 
                  type="text" 
                  placeholder="Sweet text from bestie, random compliment, hug from mom..." 
                  className="gratitude-input"
                  value={gratitudeData.peoplePower}
                  onChange={(e) => setGratitudeData(prev => ({...prev, peoplePower: e.target.value}))}
                />
              </div>
              
              <div className="gratitude-card">
                <span className="gratitude-icon">🎯</span>
                <div className="gratitude-title">Personal Wins</div>
                <p className="gratitude-description">What are you proud of today?</p>
                <input 
                  type="text" 
                  placeholder="Finished that task, tried something new, chose self-care..." 
                  className="gratitude-input"
                  value={gratitudeData.personalWins}
                  onChange={(e) => setGratitudeData(prev => ({...prev, personalWins: e.target.value}))}
                />
              </div>
            </div>
          </div>

          {/* MOOD ENERGY TRACKER */}
          <div style={{marginTop: '40px'}}>
            <h3 style={{color: '#FF6B8A', marginBottom: '20px', textAlign: 'center'}}>⚡ Mood Energy Check</h3>
            <p style={{textAlign: 'center', marginBottom: '25px', color: '#636e72', fontStyle: 'italic'}}>How are you feeling right now? Let's vibe check! 💯</p>
            
            <div className="mood-energy-grid">
              <div className="mood-energy-card">
                <div style={{fontWeight: 'bold', marginBottom: '20px', color: '#FF6B8A', fontSize: '18px', textAlign: 'center'}}>Today's Vibe</div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginBottom: '20px'}}>
                  {['amazing', 'good', 'okay', 'meh', 'rough', 'struggling'].map(mood => (
                    <div 
                      key={mood}
                      className={`mood-option ${selectedMoodEnergy === mood ? 'selected' : ''}`}
                      onClick={() => setSelectedMoodEnergy(mood)}
                    >
                      {mood === 'amazing' ? '🤩' : mood === 'good' ? '😊' : mood === 'okay' ? '😌' : mood === 'meh' ? '😐' : mood === 'rough' ? '😔' : '😰'} {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mood-energy-card">
                <div style={{fontWeight: 'bold', marginBottom: '20px', color: '#FF6B8A', fontSize: '18px', textAlign: 'center'}}>Energy Level</div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginBottom: '20px'}}>
                  {['high', 'medium', 'low', 'drained'].map(energy => (
                    <div 
                      key={energy}
                      className={`energy-option ${selectedEnergyLevel === energy ? 'selected' : ''}`}
                      onClick={() => setSelectedEnergyLevel(energy)}
                    >
                      {energy === 'high' ? '🔥' : energy === 'medium' ? '⚡' : energy === 'low' ? '💤' : '🪫'} {energy.charAt(0).toUpperCase() + energy.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mood-energy-card">
                <div style={{fontWeight: 'bold', marginBottom: '20px', color: '#FF6B8A', fontSize: '18px', textAlign: 'center'}}>Gratitude Power</div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginBottom: '20px'}}>
                  {['overflowing', 'present', 'searching', 'blocked'].map(gratitude => (
                    <div 
                      key={gratitude}
                      className={`gratitude-option ${selectedGratitudePower === gratitude ? 'selected' : ''}`}
                      onClick={() => setSelectedGratitudePower(gratitude)}
                    >
                      {gratitude === 'overflowing' ? '🌟' : gratitude === 'present' ? '✨' : gratitude === 'searching' ? '🔍' : '🚧'} {gratitude.charAt(0).toUpperCase() + gratitude.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* APPRECIATION STATION */}
          <div style={{marginTop: '40px'}}>
            <h3 style={{color: '#FF6B8A', marginBottom: '20px', textAlign: 'center'}}>💖 Appreciation Station</h3>
            <p style={{textAlign: 'center', marginBottom: '25px', color: '#636e72', fontStyle: 'italic'}}>Let's get specific about what's working in your life!</p>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
              <div className="gratitude-card">
                <span className="gratitude-icon">🏠</span>
                <div className="gratitude-title">Home & Comfort</div>
                <textarea 
                  placeholder="Grateful for my cozy space, warm shower, good wifi..." 
                  className="gratitude-textarea"
                  value={gratitudeData.homeComfort}
                  onChange={(e) => setGratitudeData(prev => ({...prev, homeComfort: e.target.value}))}
                />
              </div>
              
              <div className="gratitude-card">
                <span className="gratitude-icon">💪</span>
                <div className="gratitude-title">Body & Health</div>
                <textarea 
                  placeholder="My body carried me through the day, feeling strong..." 
                  className="gratitude-textarea"
                  value={gratitudeData.bodyHealth}
                  onChange={(e) => setGratitudeData(prev => ({...prev, bodyHealth: e.target.value}))}
                />
              </div>
              
              <div className="gratitude-card">
                <span className="gratitude-icon">🎨</span>
                <div className="gratitude-title">Opportunities & Growth</div>
                <textarea 
                  placeholder="Learned something new, got to try this, chance to..." 
                  className="gratitude-textarea"
                  value={gratitudeData.opportunitiesGrowth}
                  onChange={(e) => setGratitudeData(prev => ({...prev, opportunitiesGrowth: e.target.value}))}
                />
              </div>
              
              <div className="gratitude-card">
                <span className="gratitude-icon">🌍</span>
                <div className="gratitude-title">World Around Me</div>
                <textarea 
                  placeholder="Beautiful sunset, kind stranger, this song, nature..." 
                  className="gratitude-textarea"
                  value={gratitudeData.worldAroundMe}
                  onChange={(e) => setGratitudeData(prev => ({...prev, worldAroundMe: e.target.value}))}
                />
              </div>
            </div>
          </div>

          {/* GLOW UP PRACTICES */}
          <div className="glow-up-practices">
            <h3 style={{marginBottom: '20px', textAlign: 'center', fontSize: '28px'}}>🌟 Daily Glow-Up Practices</h3>
            <p style={{textAlign: 'center', marginBottom: '25px', fontStyle: 'italic'}}>Small actions, big energy shifts! ✨</p>
            
            <div className="practice-grid">
              {[
                { type: 'gratitude-story', icon: '📱', title: 'Gratitude Story', description: 'Share good vibes with someone' },
                { type: 'mirror-appreciation', icon: '🪞', title: 'Mirror Appreciation', description: 'Give yourself a genuine compliment' },
                { type: 'moment-capture', icon: '📸', title: 'Moment Capture', description: 'Photo or mental snapshot of something beautiful' },
                { type: 'grateful-playlist', icon: '🎵', title: 'Grateful Playlist', description: 'Listen to a song that lifts your spirit' },
                { type: 'thank-you-note', icon: '✍️', title: 'Thank You Note', description: 'Write gratitude to someone (send optional)' }
              ].map(practice => (
                <div 
                  key={practice.type}
                  className="practice-item" 
                  onClick={() => togglePractice(practice.type)}
                >
                  <span className="practice-item-icon">{practice.icon}</span>
                  <div className="practice-item-title">{practice.title}</div>
                  <p className="practice-item-description">{practice.description}</p>
                  <button className="practice-btn">
                    {completedPractices.includes(practice.type) ? 'Completed!' : 'Complete'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="gratitude-actions">
            <button onClick={saveGratitudeJournal} className="gratitude-action-btn">
              Save Gratitude Journal
            </button>
            <button onClick={saveGratitudeJournalAdvanced} className="gratitude-action-btn secondary">
              Save Advanced Journal ✨
            </button>
            <button onClick={shareJournalEntry} className="gratitude-action-btn tertiary">
              Share Journal ✨
            </button>
            <a href="/saved-journals" className="gratitude-action-btn tertiary">
              View Saved Journals
            </a>
          </div>
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
            <a href="/journal" className="nav-item active">
              <div className="nav-icon"></div>
              <div className="nav-label">Journal</div>
            </a>
            <a href="/badges" className="nav-item">
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

        {/* Plan Upgrade Overlay */}
        <div id="planUpgradeOverlay" className="plan-upgrade-overlay">
          <div className="plan-upgrade-content">
            <h2>🌟 Journal Feature Upgrade Required</h2>
            <p>Access to the Journal feature requires a Regular plan or higher.</p>
            
            <div className="promo-code-section">
              <h3>🎫 Have a Promo Code?</h3>
              <div className="promo-input-group">
                <input 
                  type="text" 
                  id="promoCodeInput" 
                  placeholder="Enter promo code (e.g., BETA30)" 
                  className="promo-code-input"
                />
                <button onClick={applyPromoCodeFromInput} className="promo-code-btn">
                  Apply Code
                </button>
              </div>
              <p className="promo-hint">Try BETA30 for 30-day access!</p>
            </div>
            
            <div className="upgrade-options">
              <button onClick={upgradeToRegular} className="upgrade-btn primary">
                Upgrade to Regular Plan
              </button>
              <button onClick={applyPromoCode} className="upgrade-btn secondary">
                Enter Promo Code
              </button>
            </div>
            
            <div className="plan-features">
              <h3>What's Included:</h3>
              <ul>
                <li>✅ Full Journal Access</li>
                <li>✅ Advanced Mood Tracking</li>
                <li>✅ Emotional Insights</li>
                <li>✅ Badge System</li>
                <li>✅ Progress Analytics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Journal Entries List */}
        <div className="section">
          <h2><span className="section-icon">📝</span>Journal Entries</h2>
          
          {/* Entry Filters */}
          <div className="entry-filters">
            <button onClick={() => filterEntries('all')} className="filter-btn active">
              All Entries
            </button>
            <button onClick={() => filterEntries('excited')} className="filter-btn">
              😊 Happy
            </button>
            <button onClick={() => filterEntries('calm')} className="filter-btn">
              😌 Calm
            </button>
            <button onClick={() => filterEntries('neutral')} className="filter-btn">
              😐 Neutral
            </button>
            <button onClick={() => filterEntries('anxious')} className="filter-btn">
              😰 Anxious
            </button>
            <button onClick={() => filterEntries('sad')} className="filter-btn">
              😔 Sad
            </button>
          </div>
          
          {/* Entries List */}
          <div id="entriesList" className="entries-list">
            {/* Entries will be loaded here */}
          </div>
        </div>
                        </div>
    </>
  );
}
