import { TextAlignment } from "pdf-lib";

export function pageStyle( { alwaysOnSidebar, isLeftHanded } ) {
	return {
		flex: 1,
		width: '100%',
		height: '100%',
		flexGrow: 1,
		flexDirection: 'column',
		paddingLeft: alwaysOnSidebar && ! isLeftHanded ? 31 : 0,
		paddingRight: alwaysOnSidebar && isLeftHanded ? 31 : 0,
	};
}



export function gratitudeStyle() {
	return {
		// === NEW: Add these styles ===
			  gratitudeSection: {
				marginTop: 15,          // space after header
				marginBottom: 20,
				padding: 10,
				borderWidth: 1,
				borderColor: '#cccccc',
				borderStyle: 'dashed',  // subtle dashed box for visual cue
				borderRadius: 6,
			  },
	};
}

export function bibleStyle() {
	return {
		borderWidth: '1px',
  		borderStyle: 'solid',
  		borderColor: 'black',
		marginTop: 5,		
		marginLeft: 5,
		marginRight:5,
		padding: 10,
		fontSize:10,
	};
}

export function personalStyle() {
	return {
		borderWidth: '1px',
  		borderStyle: 'solid',
  		borderColor: 'black',
		marginTop: 5,		
		marginLeft: 5,
		marginRight:5,
		padding: 10,
		fontSize:10,
		alignItems: 'center',
	};
}


export const content = {
	flex: 1,
	flexGrow: 1,
	borderTop: '1 solid black',
};
