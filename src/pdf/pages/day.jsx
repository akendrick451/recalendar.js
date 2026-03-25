import { Text, Page, View, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs/esm';
import PropTypes from 'prop-types';

import {
  findByDate,
  DATE_FORMAT as SPECIAL_DATES_DATE_FORMAT,
} from '~/lib/special-dates-utils';
import Header from '~/pdf/components/header';
import Itinerary from '~/pdf/components/itinerary';
import MiniCalendar from '~/pdf/components/mini-calendar';
import PdfConfig from '~/pdf/config';
import {
  dayPageLink,
  nextDayPageLink,
  previousDayPageLink,
  monthOverviewLink,
} from '~/pdf/lib/links';
import { content, pageStyle, bibleStyle } from '~/pdf/styles';
import { splitItemsByPages } from '~/pdf/utils';
import { gratitudeStyle } from '../styles';
// Temporary hack to silence React Refresh in PDF worker
if (typeof window === 'undefined' || !window.$RefreshReg$) {
  globalThis.$RefreshReg$ = () => {};
  globalThis.$RefreshSig$ = () => (type) => type;
}

const DayPage = ({ date, config, verseData, quoteData, personalQuoteData }) => {

  const { items, isEnabled } = config.dayItineraries[date.weekday()];
  if (!isEnabled) return null;

  const itemsByPage = splitItemsByPages(items);
  const specialDateKey = date.format(SPECIAL_DATES_DATE_FORMAT);
  const specialItems = config.specialDates.filter(findByDate(specialDateKey));

  const styles = StyleSheet.create(
		Object.assign( {}, 
		{ content, page: pageStyle( config ) }, 
		{ content, page: gratitudeStyle(config )} ,
		{ content, page: bibleStyle(config )}),		
	);

  return (
    <>
      {/* First page: Header + Bible Verse + Gratitude */}
      <Page id={dayPageLink(date, config)} size={config.pageSize} dpi={config.dpi}>
        <View style={styles.page}>
          <Header
            isLeftHanded={config.isLeftHanded}
            title={date.format('MMMM')}
            titleLink={'#' + monthOverviewLink(date, config)}
            subtitle={date.format('dddd')}
            number={date.format('DD')}
            previousLink={'#' + previousDayPageLink(date, config)}
            nextLink={'#' + nextDayPageLink(date, config)}
            calendar={<MiniCalendar date={date} config={config} />}
            specialItems={specialItems}
          />

          {/* ====================== RANDOM BIBLE VERSE ====================== */}
          <View style={styles.bibleStyle}>            {verseData ? (
              <>
                <Text style={styles.bibleText}>“{verseData.text}”</Text>
                <Text style={styles.bibleRef}>— {verseData.reference}</Text>
              </>
            ) : (
              <Text style={styles.bibleText}>Loading verse...</Text>
            )}
          </View>

          {/* Your gratitude section */}
          <View style={styles.gratitudeSection}>
            <Text style={styles.questionText}>What I'm grateful for:</Text>
            <Text style={{ fontSize: 11, marginTop: 10, marginLeft: 10 }}>
              generally? ____________________________________________
            </Text>
            <Text style={{ fontSize: 11, marginTop: 10, marginLeft: 10 }}>
              who? ____________________________________________
            </Text>
            <Text style={{ fontSize: 11, marginTop: 10, marginLeft: 10 }}>
              yesterday? ____________________________________________
            </Text>
          </View>

          {/* ====================== RANDOM quote  ====================== */}
          <View style={styles.bibleSection}>
            {quoteData ? (
              <>
                <Text style={styles.bibleText}>“{quoteData.text}”</Text>
              </>
            ) : (
              <Text style={styles.bibleText}>Loading quote...</Text>
            )}
          </View>

          {/* ====================== personal quote  ====================== */}
          <View style={styles.bibleSection}>
            {personalQuoteData ? (
              <>
                <Text style={styles.bibleText}>“{personalQuoteData.text}”</Text>
              </>
            ) : (
              <Text style={styles.bibleText}>Loading personal quote...</Text>
            )}
          </View>

        </View>

      </Page>

      {/* Extra itinerary pages if any */}
      {itemsByPage.slice(1).map((pageItems, index) => (
        <Page key={index} size={config.pageSize} dpi={config.dpi}>
          <View style={styles.page}>
            <Itinerary items={pageItems} />
          </View>
        </Page>
      ))}

      {/* Second page: Day Plan */}
      <Page id={dayPageLink(date, config)} size={config.pageSize} dpi={config.dpi}>
        <View style={styles.page}>
          <Header
            isLeftHanded={config.isLeftHanded}
            title={'Day Plan - ' + date.format('MMMM')}
            titleLink={'#' + monthOverviewLink(date, config)}
            subtitle={date.format('dddd')}
            number={date.format('DD')}
            previousLink={'#' + previousDayPageLink(date, config)}
            nextLink={'#' + nextDayPageLink(date, config)}
          />
          <View style={styles.content}>
            <Itinerary items={itemsByPage[0]} />
          </View>
        </View>
      </Page>
    </>
  );
};

DayPage.propTypes = {
  config: PropTypes.instanceOf(PdfConfig).isRequired,
  date: PropTypes.instanceOf(dayjs).isRequired,
  verseData: PropTypes.shape({
    text: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
  }),
  quoteData: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }),
  personalQuoteData: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }),
};

export default DayPage;