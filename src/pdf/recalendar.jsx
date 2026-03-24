import { Document, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs/esm';
import PropTypes from 'prop-types';
import React from 'react';

import PdfConfig from '~/pdf/config';
import DayPage from '~/pdf/pages/day';
import LastPage from '~/pdf/pages/last';
import MonthOverviewPage from '~/pdf/pages/month-overview';
import WeekOverviewPage from '~/pdf/pages/week-overview';
import WeekRetrospectivePage from '~/pdf/pages/week-retrospective';
import YearOverviewPage from '~/pdf/pages/year-overview';
import TitlePage from '~/pdf/pages/title-page';
import EmotionsPage from '~/pdf/pages/emotions';
import dayOfYear from 'dayjs/esm/plugin/dayOfYear';
dayjs.extend(dayOfYear);   // ← This fixes the error

// Small list of nice verses (you can add more)
const bibleVerses = [
  { text: "The Lord is my shepherd; I shall not want.", reference: "Psalm 23:1" },
  { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
  { text: "Be still, and know that I am God.", reference: "Psalm 46:10" },
  { text: "For God so loved the world that he gave his one and only Son.", reference: "John 3:16" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
  { text: "Love the Lord your God with all your heart and with all your soul and with all your mind.", reference: "Matthew 22:37" },
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", reference: "Philippians 4:6" },
  { text: "The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness.", reference: "Galatians 5:22" },
  // Add as many as you like — more variety = better
];

const RecalendarPdf = ({ config, isPreview }) => {
  const styles = StyleSheet.create({
    document: {
      fontFamily: config.fontFamily,
    },
  });

  // Seeded random — same verse for the same date every time you regenerate
  const getVerseForDate = (date) => {
    const dayOfYear = date.dayOfYear();           // 1 to 366
    const index = dayOfYear % bibleVerses.length; // repeatable
    return bibleVerses[index];
  };

  const renderWeek = (startOfWeek) => {
    const weekPages = [];
    let currentDate = startOfWeek.clone();
    const endOfWeek = startOfWeek.add(1, 'weeks');

    while (currentDate.isBefore(endOfWeek)) {
      if (config.isMonthOverviewEnabled && currentDate.date() === 1) {
        weekPages.push(
          <MonthOverviewPage
            key={'month-overview-' + currentDate.unix()}
            date={currentDate}
            config={config}
          />,
        );
      }

      const verseData = getVerseForDate(currentDate);

      weekPages.push(
        <DayPage
          key={'day-' + currentDate.unix()}
          date={currentDate}
          config={config}
          verseData={verseData}
        />
      );

      currentDate = currentDate.add(1, 'days');
    }

    return (
      <React.Fragment key={'week-' + startOfWeek.unix()}>
        {config.isWeekOverviewEnabled && (
          <WeekOverviewPage date={startOfWeek} config={config} />
        )}
        <EmotionsPage config={config} />
        {weekPages}
        {config.isWeekRetrospectiveEnabled && (
          <WeekRetrospectivePage date={startOfWeek} config={config} />
        )}
      </React.Fragment>
    );
  };

  const renderCalendar = () => {
    const { year, month, monthCount } = config;
    const pageList = [];

    let currentDate = dayjs.utc({ year, month, day: 1 });
    const endDate = currentDate.add(monthCount, 'months');

    pageList.push(
      <TitlePage
        key={'title-' + year}
        startDate={currentDate}
        config={config}
      />,
    );

    pageList.push(
      <YearOverviewPage
        key={'year-overview-' + year}
        startDate={currentDate}
        endDate={endDate}
        config={config}
      />,
    );

    currentDate = currentDate.startOf('week');
    while (currentDate.isBefore(endDate)) {
      pageList.push(renderWeek(currentDate));

      currentDate = currentDate.add(1, 'weeks');
      if (isPreview && currentDate.month() === month + 1) {
        break;
      }
    }

    pageList.push(<LastPage key="last" config={config} />);

    return pageList;
  };

  return <Document style={styles.document}>{renderCalendar()}</Document>;
};

RecalendarPdf.propTypes = {
  config: PropTypes.instanceOf(PdfConfig).isRequired,
  isPreview: PropTypes.bool.isRequired,
};

export default RecalendarPdf;