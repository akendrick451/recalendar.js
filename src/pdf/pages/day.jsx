import { Text, Page, View, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs/esm';
import PropTypes from 'prop-types';
import React from 'react';

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
import { content, pageStyle } from '~/pdf/styles';
import { splitItemsByPages } from '~/pdf/utils';
import { gratitudeStyle } from '../styles';
import { bibleStyle } from '~/pdf/styles';

class DayPage extends React.Component {
	styles = StyleSheet.create(
		Object.assign( {}, 
		{ content, page: pageStyle( this.props.config ) }, 
		{ content, page: gratitudeStyle(this.props.config )} ,
		{ content, page: bibleStyle(this.props.config )}),		
	);

	renderExtraItems = ( items, index ) => (
		<Page key={ index } size={ this.props.config.pageSize } dpi={ this.props.config.dpi }>
			<View style={ this.styles.page }>
				<Itinerary items={ items } />
			</View>
		</Page>
	);

	render() {
		const { date, config } = this.props;
		const { items, isEnabled } = config.dayItineraries[ date.weekday() ];
		if ( ! isEnabled ) {
			return null;
		}
		const itemsByPage = splitItemsByPages( items );

		const specialDateKey = this.props.date.format( SPECIAL_DATES_DATE_FORMAT );
		const specialItems = this.props.config.specialDates.filter(
			findByDate( specialDateKey ),
		);
		return (
			<>
				<Page id={ dayPageLink( date, config ) } size={ config.pageSize } dpi={ config.dpi }>
					<View style={ this.styles.page }>
						<Header
							isLeftHanded={ config.isLeftHanded }
							title={ date.format( 'MMMM' ) }
							titleLink={ '#' + monthOverviewLink( date, config ) }
							subtitle={ date.format( 'dddd' ) }
							number={ date.format( 'DD' ) }
							previousLink={ '#' + previousDayPageLink( date, config ) }
							nextLink={ '#' + nextDayPageLink( date, config ) }
							calendar={ <MiniCalendar date={ date } config={ config } /> }
							specialItems={ specialItems }
						/>
						<View style={this.styles.bibleSection}>				
							<Text style={this.styles.questionText}>
								My bible quote
								</Text>

						</View>	
							{/* === NEW: Gratitude prompt block === */}
							<View style={this.styles.gratitudeSection}>								
								<Text style={this.styles.questionText}>
									What I'm grateful for:
								</Text>
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
								{/* Optional: extra space or smaller lines below */}
							
					</View>
					
				</Page>
				 {itemsByPage.slice( 1 ).map( this.renderExtraItems )}
				<Page id={ dayPageLink( date, config ) } size={ config.pageSize } dpi={ config.dpi }>
					<View style={ this.styles.page }>
						<Header
							isLeftHanded={ config.isLeftHanded }
							title= {'Day Plan - ' +  date.format( 'MMMM' ) }
							titleLink={ '#' + monthOverviewLink( date, config ) }
							subtitle={ date.format( 'dddd' ) }
							number={ date.format( 'DD' ) }
							previousLink={ '#' + previousDayPageLink( date, config ) }
							nextLink={ '#' + nextDayPageLink( date, config ) }														
						/>
						<View style={ this.styles.content }>
							<Itinerary items={ itemsByPage[ 0 ] } />
						</View>
					</View>
				</Page>
			</>
		);
	}
}

DayPage.propTypes = {
	config: PropTypes.instanceOf( PdfConfig ).isRequired,
	date: PropTypes.instanceOf( dayjs ).isRequired,
};

export default DayPage;
