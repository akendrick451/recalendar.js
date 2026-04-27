import { Text, Page, View, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs/esm';
import PropTypes from 'prop-types';


// AK TO DO ==============================================================

// page 1 journal to 80% - DONE
// page 2 journal to 80% - currently 40%
//  make 4 quadrants
//  make bottom section
//  make right hand section
//  make right hand section select from 3 sources
// summaries etc to 80%


// AK TO DO ==============================================================


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
import { content, pageStyle, bibleStyle, dayStyle , writingInputLines, lineBreak, dayPage2} from '~/pdf/styles';
import { splitItemsByPages } from '~/pdf/utils';
import { gratitudeStyle, quoteStyle } from '~/pdf/styles';
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

  const breakStyle = lineBreak(20);   // 20 = quite a big gap


const styles = StyleSheet.create({
  ...pageStyle(config),
  ...gratitudeStyle(config),
  ...bibleStyle(config),
  ...quoteStyle(config),
  ...dayStyle(config), 
  ...writingInputLines(config),
  ...dayPage2(config),
  })


  return (
    <>
      {/* First page: Header + Bible Verse + Gratitude */}
      <Page id={dayPageLink(date, config)} size={config.pageSize} dpi={config.dpi}>
        <View style={styles.dayStyle}>
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
         <View style={styles.bibleStyle}>
  {verseData ? (
    <>
      <Text style={styles.bibleText}>“{verseData.text}”</Text>
      <Text style={styles.bibleRef}>— {verseData.reference}</Text>
    </>
  ) : (
    <Text style={styles.bibleText}>Loading verse...</Text>
  )}
</View>

{/* Your gratitude section */}
<View>
  <Text style={styles.label}>What I'm grateful for:</Text>
  <Text style={{ height: 12 }}>{'\u00A0'}</Text>

  <View style={styles.row}>
    <Text style={styles.promptText}>generally?</Text>
    <View style={styles.underlineContainer}>
      <Text style={styles.writingText}>{'\u00A0'}</Text>
      <View style={styles.underline} />
    </View>
  </View>

  <View style={styles.row}>
    <Text style={styles.promptText}>who?</Text>
    <View style={styles.underlineContainer}>
      <Text style={styles.writingText}>{'\u00A0'}</Text>
      <View style={styles.underline} />
    </View>
  </View>

  <View style={styles.row}>
    <Text style={styles.promptText}>yesterday?</Text>
    <View style={styles.underlineContainer}>
      <Text style={styles.writingText}>{'\u00A0'}</Text>
      <View style={styles.underline} />
    </View>
  </View>
</View>

{/* RANDOM quote */}
<View style={styles.quoteSection}>
  {quoteData ? (
    <Text style={styles.quoteStyle}>“{quoteData.text}”</Text>
  ) : (
    <Text style={styles.quoteStyle}>Loading quote...</Text>
  )}
</View>

{/* personal quote */}
<View style={styles.quoteSection}>
  {personalQuoteData ? (
    <Text style={styles.quoteStyle}>“{personalQuoteData.text}”</Text>
  ) : (
    <Text style={styles.quoteStyle}>Loading personal quote...</Text>
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

             <View style={styles.dayRow}>
                {/* Left Column */}
                <View style={styles.dayColumn1}>
                   <View style={styles.dayRow}>
                      <View style={styles.dayColumn50}>
                      <View style={styles.rowBottomBorder}>
  <Text>Your text here</Text>
</View>
                         <Text>CBT Reframe</Text>
                          <Text>Area:</Text>
                          <Text>Thought:</Text>
                          <Text>Feeling:</Text>


                        
                        
                   <Text>09:00 - 10:00</Text>
                    <Text>10:00 - 11:00</Text>
                    <Text>11:00 - 12:00</Text>
                    <Text>12:00 - 13:00</Text>
                    <Text>13:00 - 14:00</Text>
                    <Text>14:00 - 15:00</Text>
                    <Text>15:00 - 16:00</Text>
                    <Text>16:00 - 17:00</Text>
                    <Text>17:00 - 18:00</Text>
                    <Text>18:00 - 19:00</Text>
                    <Text>19:00 - 20:00</Text>
                    <Text>20:00 - 21:00</Text>
                    </View>
                    <View style={styles.dayColumn50}>
                                           <Text>Plan</Text> 
 
                    </View>
                  </View>

           <View style={styles.innerRow}>
             <Text>Column 1 - Row 1 Content</Text>
     
    </View>
       <View style={styles.innerRow}>
      <Text>Column 1 - Row 2 Content</Text>
               <Itinerary items={itemsByPage[0]} />

    </View>
                   

        </View>
        
        {/* Right Column */}
        <View style={styles.dayColumn2}>
          <Text>Content for the second column.</Text>
        </View>
      </View>
          
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