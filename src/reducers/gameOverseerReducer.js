export default function gameOverseerReducer(
  state = {
    cable: null,
    subscription: null,
    error: false,
    subscriptionActive: null,
    rejected: false,
    lobbyData: {},
    gameData: { game: [], spawners: [], units: [] },
    currentHighlightedCoordinate: { X: null, Y: null },
    mapState: initialGameState,
    turnSent: false,
    stepNumber: 0,
    turnCount: 0,
    animationActive: false,
    demoCoordinateHash: {},
    gameComplete: false
  },
  action
) {
  switch (action.type) {
    case "ADD_CABLE":
      return {
        ...state,
        cable: action.payload
      };
    case "INIT_GAME":
      return {
        ...state,
        gameData: {
          game: action.payload.game.data,
          spawners: action.payload.spawners.data,
          units: action.payload.units.data
        },
        mapState: action.payload.game.data.attributes.map_state
      };
    case "UPDATE_TURN_COUNT":
      return {
        ...state,
        turnCount: action.payload
      };
    case "UPDATE_GAME_COMPLETE":
      return {
        ...state,
        gameComplete: action.payload
      };
    case "ADD_COORDINATE":
      state.demoCoordinateHash[action.payload] = "selected";
      return {
        ...state
      };
    case "REMOVE_COORDINATE":
      delete state.demoCoordinateHash[action.payload];
      return {
        ...state
      };
    case "UPDATE_ANIMATION_ACTIVE":
      return {
        ...state,
        animationActive: action.payload
      };
    case "UPDATE_CURRENT_HIGHLIGHTED_COORDINATE":
      return {
        ...state,
        currentHighlightedCoordinate: action.payload
      };
    case "ADD_GAME_OVERSEER_SUB":
      return {
        ...state,
        subscription: action.payload,
        error: false
      };
    case "UPDATE_TURN_SENT":
      return {
        ...state,
        turnSent: action.payload
      };
    case "UPDATE_GAME_LOBBY":
      return {
        ...state,
        subscriptionActive: true,
        lobbyData: action.payload.data
      };
    case "UPDATE_ERROR_FOR_GAME_OVERSEER":
      return {
        ...state,
        error: action.payload
      };
    case "REJECT_GAME_SUBSCRIPTION":
      return {
        ...state,
        rejected: action.payload,
        subscriptionActive: false,
        subscription: null,
        error: action.payload
      };
    case "RESET_GAME_OVERSEER":
      return {
        ...state,
        gameData: { game: [], spawners: [], units: [] },
        rejected: false,
        subscriptionActive: false,
        lobbyData: {},
        subscription: null,
        error: false,
        currentHighlightedCoordinate: { X: null, Y: null },
        mapState: initialGameState,
        stepNumber: 0,
        turnCount: 0,
        animationActive: false,
        demoCoordinateHash: {},
        gameComplete: false
      };
    case "UPDATE_GAME_OF_TURN":
      return {
        ...state,
        gameData: {
          game: action.payload.game.data,
          spawners: action.payload.spawners.data,
          units: action.payload.units.data,
          turn: action.payload.turn.data
        }
      };
    case "UPDATE_MAP_STATE":
      return {
        ...state,
        mapState: action.payload.mapState,
        stepNumber: action.payload.stepNumber
      };
    default:
      return state;
  }
}

const initialGameState = [
    {
      xy: '0101',
      c: null,
      e: 0
    },
    {
      xy: '0201',
      c: null,
      e: 0
    },
    {
      xy: '0301',
      c: null,
      e: 0
    },
    {
      xy: '0401',
      c: null,
      e: 0
    },
    {
      xy: '0501',
      c: null,
      e: 0
    },
    {
      xy: '0601',
      c: null,
      e: 0
    },
    {
      xy: '0701',
      c: null,
      e: 0
    },
    {
      xy: '0801',
      c: null,
      e: 0
    },
    {
      xy: '0901',
      c: null,
      e: 0
    },
    {
      xy: '1001',
      c: null,
      e: 0
    },
    {
      xy: '1101',
      c: null,
      e: 0
    },
    {
      xy: '1201',
      c: null,
      e: 0
    },
    {
      xy: '1301',
      c: null,
      e: 0
    },
    {
      xy: '1401',
      c: null,
      e: 0
    },
    {
      xy: '1501',
      c: null,
      e: 0
    },
    {
      xy: '1601',
      c: null,
      e: 0
    },
    {
      xy: '1701',
      c: null,
      e: 0
    },
    {
      xy: '1801',
      c: null,
      e: 0
    },
    {
      xy: '1901',
      c: null,
      e: 0
    },
    {
      xy: '2001',
      c: null,
      e: 0
    },
    {
      xy: '2101',
      c: null,
      e: 0
    },
    {
      xy: '2201',
      c: null,
      e: 0
    },
    {
      xy: '2301',
      c: null,
      e: 0
    },
    {
      xy: '2401',
      c: null,
      e: 0
    },
    {
      xy: '2501',
      c: null,
      e: 0
    },
    {
      xy: '0102',
      c: null,
      e: 0
    },
    {
      xy: '0202',
      c: null,
      e: 0
    },
    {
      xy: '0302',
      c: null,
      e: 0
    },
    {
      xy: '0402',
      c: null,
      e: 0
    },
    {
      xy: '0502',
      c: null,
      e: 0
    },
    {
      xy: '0602',
      c: null,
      e: 0
    },
    {
      xy: '0702',
      c: null,
      e: 0
    },
    {
      xy: '0802',
      c: null,
      e: 0
    },
    {
      xy: '0902',
      c: null,
      e: 0
    },
    {
      xy: '1002',
      c: null,
      e: 0
    },
    {
      xy: '1102',
      c: null,
      e: 0
    },
    {
      xy: '1202',
      c: null,
      e: 0
    },
    {
      xy: '1302',
      c: null,
      e: 0
    },
    {
      xy: '1402',
      c: null,
      e: 0
    },
    {
      xy: '1502',
      c: null,
      e: 0
    },
    {
      xy: '1602',
      c: null,
      e: 0
    },
    {
      xy: '1702',
      c: null,
      e: 0
    },
    {
      xy: '1802',
      c: null,
      e: 0
    },
    {
      xy: '1902',
      c: null,
      e: 0
    },
    {
      xy: '2002',
      c: null,
      e: 0
    },
    {
      xy: '2102',
      c: null,
      e: 0
    },
    {
      xy: '2202',
      c: null,
      e: 0
    },
    {
      xy: '2302',
      c: null,
      e: 0
    },
    {
      xy: '2402',
      c: null,
      e: 0
    },
    {
      xy: '2502',
      c: null,
      e: 0
    },
    {
      xy: '0103',
      c: null,
      e: 0
    },
    {
      xy: '0203',
      c: null,
      e: 0
    },
    {
      xy: '0303',
      c: null,
      e: 0
    },
    {
      xy: '0403',
      c: null,
      e: 0
    },
    {
      xy: '0503',
      c: null,
      e: 0
    },
    {
      xy: '0603',
      c: null,
      e: 0
    },
    {
      xy: '0703',
      c: null,
      e: 0
    },
    {
      xy: '0803',
      c: null,
      e: 0
    },
    {
      xy: '0903',
      c: null,
      e: 0
    },
    {
      xy: '1003',
      c: null,
      e: 0
    },
    {
      xy: '1103',
      c: null,
      e: 0
    },
    {
      xy: '1203',
      c: null,
      e: 0
    },
    {
      xy: '1303',
      c: null,
      e: 0
    },
    {
      xy: '1403',
      c: null,
      e: 0
    },
    {
      xy: '1503',
      c: null,
      e: 0
    },
    {
      xy: '1603',
      c: null,
      e: 0
    },
    {
      xy: '1703',
      c: null,
      e: 0
    },
    {
      xy: '1803',
      c: null,
      e: 0
    },
    {
      xy: '1903',
      c: null,
      e: 0
    },
    {
      xy: '2003',
      c: null,
      e: 0
    },
    {
      xy: '2103',
      c: null,
      e: 0
    },
    {
      xy: '2203',
      c: null,
      e: 0
    },
    {
      xy: '2303',
      c: null,
      e: 0
    },
    {
      xy: '2403',
      c: null,
      e: 0
    },
    {
      xy: '2503',
      c: null,
      e: 0
    },
    {
      xy: '0104',
      c: null,
      e: 0
    },
    {
      xy: '0204',
      c: null,
      e: 0
    },
    {
      xy: '0304',
      c: null,
      e: 0
    },
    {
      xy: '0404',
      c: null,
      e: 0
    },
    {
      xy: '0504',
      c: null,
      e: 0
    },
    {
      xy: '0604',
      c: null,
      e: 0
    },
    {
      xy: '0704',
      c: null,
      e: 0
    },
    {
      xy: '0804',
      c: null,
      e: 0
    },
    {
      xy: '0904',
      c: null,
      e: 0
    },
    {
      xy: '1004',
      c: null,
      e: 0
    },
    {
      xy: '1104',
      c: null,
      e: 0
    },
    {
      xy: '1204',
      c: null,
      e: 0
    },
    {
      xy: '1304',
      c: null,
      e: 0
    },
    {
      xy: '1404',
      c: null,
      e: 0
    },
    {
      xy: '1504',
      c: null,
      e: 0
    },
    {
      xy: '1604',
      c: null,
      e: 0
    },
    {
      xy: '1704',
      c: null,
      e: 0
    },
    {
      xy: '1804',
      c: null,
      e: 0
    },
    {
      xy: '1904',
      c: null,
      e: 0
    },
    {
      xy: '2004',
      c: null,
      e: 0
    },
    {
      xy: '2104',
      c: null,
      e: 0
    },
    {
      xy: '2204',
      c: null,
      e: 0
    },
    {
      xy: '2304',
      c: null,
      e: 0
    },
    {
      xy: '2404',
      c: null,
      e: 0
    },
    {
      xy: '2504',
      c: null,
      e: 0
    },
    {
      xy: '0105',
      c: null,
      e: 0
    },
    {
      xy: '0205',
      c: null,
      e: 0
    },
    {
      xy: '0305',
      c: null,
      e: 0
    },
    {
      xy: '0405',
      c: null,
      e: 0
    },
    {
      xy: '0505',
      c: null,
      e: 0
    },
    {
      xy: '0605',
      c: null,
      e: 0
    },
    {
      xy: '0705',
      c: null,
      e: 0
    },
    {
      xy: '0805',
      c: null,
      e: 0
    },
    {
      xy: '0905',
      c: null,
      e: 0
    },
    {
      xy: '1005',
      c: null,
      e: 0
    },
    {
      xy: '1105',
      c: null,
      e: 0
    },
    {
      xy: '1205',
      c: null,
      e: 0
    },
    {
      xy: '1305',
      c: null,
      e: 0
    },
    {
      xy: '1405',
      c: null,
      e: 0
    },
    {
      xy: '1505',
      c: null,
      e: 0
    },
    {
      xy: '1605',
      c: null,
      e: 0
    },
    {
      xy: '1705',
      c: null,
      e: 0
    },
    {
      xy: '1805',
      c: null,
      e: 0
    },
    {
      xy: '1905',
      c: null,
      e: 0
    },
    {
      xy: '2005',
      c: null,
      e: 0
    },
    {
      xy: '2105',
      c: null,
      e: 0
    },
    {
      xy: '2205',
      c: null,
      e: 0
    },
    {
      xy: '2305',
      c: null,
      e: 0
    },
    {
      xy: '2405',
      c: null,
      e: 0
    },
    {
      xy: '2505',
      c: null,
      e: 0
    },
    {
      xy: '0106',
      c: null,
      e: 0
    },
    {
      xy: '0206',
      c: null,
      e: 0
    },
    {
      xy: '0306',
      c: null,
      e: 0
    },
    {
      xy: '0406',
      c: null,
      e: 0
    },
    {
      xy: '0506',
      c: null,
      e: 0
    },
    {
      xy: '0606',
      c: null,
      e: 0
    },
    {
      xy: '0706',
      c: null,
      e: 0
    },
    {
      xy: '0806',
      c: null,
      e: 0
    },
    {
      xy: '0906',
      c: null,
      e: 0
    },
    {
      xy: '1006',
      c: null,
      e: 0
    },
    {
      xy: '1106',
      c: null,
      e: 0
    },
    {
      xy: '1206',
      c: null,
      e: 0
    },
    {
      xy: '1306',
      c: null,
      e: 0
    },
    {
      xy: '1406',
      c: null,
      e: 0
    },
    {
      xy: '1506',
      c: null,
      e: 0
    },
    {
      xy: '1606',
      c: null,
      e: 0
    },
    {
      xy: '1706',
      c: null,
      e: 0
    },
    {
      xy: '1806',
      c: null,
      e: 0
    },
    {
      xy: '1906',
      c: null,
      e: 0
    },
    {
      xy: '2006',
      c: null,
      e: 0
    },
    {
      xy: '2106',
      c: null,
      e: 0
    },
    {
      xy: '2206',
      c: null,
      e: 0
    },
    {
      xy: '2306',
      c: null,
      e: 0
    },
    {
      xy: '2406',
      c: null,
      e: 0
    },
    {
      xy: '2506',
      c: null,
      e: 0
    },
    {
      xy: '0107',
      c: null,
      e: 0
    },
    {
      xy: '0207',
      c: null,
      e: 0
    },
    {
      xy: '0307',
      c: null,
      e: 0
    },
    {
      xy: '0407',
      c: null,
      e: 0
    },
    {
      xy: '0507',
      c: null,
      e: 0
    },
    {
      xy: '0607',
      c: null,
      e: 0
    },
    {
      xy: '0707',
      c: null,
      e: 0
    },
    {
      xy: '0807',
      c: null,
      e: 0
    },
    {
      xy: '0907',
      c: null,
      e: 0
    },
    {
      xy: '1007',
      c: null,
      e: 0
    },
    {
      xy: '1107',
      c: null,
      e: 0
    },
    {
      xy: '1207',
      c: null,
      e: 0
    },
    {
      xy: '1307',
      c: null,
      e: 0
    },
    {
      xy: '1407',
      c: null,
      e: 0
    },
    {
      xy: '1507',
      c: null,
      e: 0
    },
    {
      xy: '1607',
      c: null,
      e: 0
    },
    {
      xy: '1707',
      c: null,
      e: 0
    },
    {
      xy: '1807',
      c: null,
      e: 0
    },
    {
      xy: '1907',
      c: null,
      e: 0
    },
    {
      xy: '2007',
      c: null,
      e: 0
    },
    {
      xy: '2107',
      c: null,
      e: 0
    },
    {
      xy: '2207',
      c: null,
      e: 0
    },
    {
      xy: '2307',
      c: null,
      e: 0
    },
    {
      xy: '2407',
      c: null,
      e: 0
    },
    {
      xy: '2507',
      c: null,
      e: 0
    },
    {
      xy: '0108',
      c: null,
      e: 0
    },
    {
      xy: '0208',
      c: null,
      e: 0
    },
    {
      xy: '0308',
      c: null,
      e: 0
    },
    {
      xy: '0408',
      c: null,
      e: 0
    },
    {
      xy: '0508',
      c: null,
      e: 0
    },
    {
      xy: '0608',
      c: null,
      e: 0
    },
    {
      xy: '0708',
      c: null,
      e: 0
    },
    {
      xy: '0808',
      c: null,
      e: 0
    },
    {
      xy: '0908',
      c: null,
      e: 0
    },
    {
      xy: '1008',
      c: null,
      e: 0
    },
    {
      xy: '1108',
      c: null,
      e: 0
    },
    {
      xy: '1208',
      c: null,
      e: 0
    },
    {
      xy: '1308',
      c: null,
      e: 0
    },
    {
      xy: '1408',
      c: null,
      e: 0
    },
    {
      xy: '1508',
      c: null,
      e: 0
    },
    {
      xy: '1608',
      c: null,
      e: 0
    },
    {
      xy: '1708',
      c: null,
      e: 0
    },
    {
      xy: '1808',
      c: null,
      e: 0
    },
    {
      xy: '1908',
      c: null,
      e: 0
    },
    {
      xy: '2008',
      c: null,
      e: 0
    },
    {
      xy: '2108',
      c: null,
      e: 0
    },
    {
      xy: '2208',
      c: null,
      e: 0
    },
    {
      xy: '2308',
      c: null,
      e: 0
    },
    {
      xy: '2408',
      c: null,
      e: 0
    },
    {
      xy: '2508',
      c: null,
      e: 0
    },
    {
      xy: '0109',
      c: null,
      e: 0
    },
    {
      xy: '0209',
      c: null,
      e: 0
    },
    {
      xy: '0309',
      c: null,
      e: 0
    },
    {
      xy: '0409',
      c: null,
      e: 0
    },
    {
      xy: '0509',
      c: null,
      e: 0
    },
    {
      xy: '0609',
      c: null,
      e: 0
    },
    {
      xy: '0709',
      c: null,
      e: 0
    },
    {
      xy: '0809',
      c: null,
      e: 0
    },
    {
      xy: '0909',
      c: null,
      e: 0
    },
    {
      xy: '1009',
      c: null,
      e: 0
    },
    {
      xy: '1109',
      c: null,
      e: 0
    },
    {
      xy: '1209',
      c: null,
      e: 0
    },
    {
      xy: '1309',
      c: null,
      e: 0
    },
    {
      xy: '1409',
      c: null,
      e: 0
    },
    {
      xy: '1509',
      c: null,
      e: 0
    },
    {
      xy: '1609',
      c: null,
      e: 0
    },
    {
      xy: '1709',
      c: null,
      e: 0
    },
    {
      xy: '1809',
      c: null,
      e: 0
    },
    {
      xy: '1909',
      c: null,
      e: 0
    },
    {
      xy: '2009',
      c: null,
      e: 0
    },
    {
      xy: '2109',
      c: null,
      e: 0
    },
    {
      xy: '2209',
      c: null,
      e: 0
    },
    {
      xy: '2309',
      c: null,
      e: 0
    },
    {
      xy: '2409',
      c: null,
      e: 0
    },
    {
      xy: '2509',
      c: null,
      e: 0
    },
    {
      xy: '0110',
      c: null,
      e: 0
    },
    {
      xy: '0210',
      c: null,
      e: 0
    },
    {
      xy: '0310',
      c: null,
      e: 0
    },
    {
      xy: '0410',
      c: null,
      e: 0
    },
    {
      xy: '0510',
      c: null,
      e: 0
    },
    {
      xy: '0610',
      c: null,
      e: 0
    },
    {
      xy: '0710',
      c: null,
      e: 0
    },
    {
      xy: '0810',
      c: null,
      e: 0
    },
    {
      xy: '0910',
      c: null,
      e: 0
    },
    {
      xy: '1010',
      c: null,
      e: 0
    },
    {
      xy: '1110',
      c: null,
      e: 0
    },
    {
      xy: '1210',
      c: null,
      e: 0
    },
    {
      xy: '1310',
      c: null,
      e: 0
    },
    {
      xy: '1410',
      c: null,
      e: 0
    },
    {
      xy: '1510',
      c: null,
      e: 0
    },
    {
      xy: '1610',
      c: null,
      e: 0
    },
    {
      xy: '1710',
      c: null,
      e: 0
    },
    {
      xy: '1810',
      c: null,
      e: 0
    },
    {
      xy: '1910',
      c: null,
      e: 0
    },
    {
      xy: '2010',
      c: null,
      e: 0
    },
    {
      xy: '2110',
      c: null,
      e: 0
    },
    {
      xy: '2210',
      c: null,
      e: 0
    },
    {
      xy: '2310',
      c: null,
      e: 0
    },
    {
      xy: '2410',
      c: null,
      e: 0
    },
    {
      xy: '2510',
      c: null,
      e: 0
    },
    {
      xy: '0111',
      c: null,
      e: 0
    },
    {
      xy: '0211',
      c: null,
      e: 0
    },
    {
      xy: '0311',
      c: null,
      e: 0
    },
    {
      xy: '0411',
      c: null,
      e: 0
    },
    {
      xy: '0511',
      c: null,
      e: 0
    },
    {
      xy: '0611',
      c: null,
      e: 0
    },
    {
      xy: '0711',
      c: null,
      e: 0
    },
    {
      xy: '0811',
      c: null,
      e: 0
    },
    {
      xy: '0911',
      c: null,
      e: 0
    },
    {
      xy: '1011',
      c: null,
      e: 0
    },
    {
      xy: '1111',
      c: null,
      e: 0
    },
    {
      xy: '1211',
      c: null,
      e: 0
    },
    {
      xy: '1311',
      c: null,
      e: 0
    },
    {
      xy: '1411',
      c: null,
      e: 0
    },
    {
      xy: '1511',
      c: null,
      e: 0
    },
    {
      xy: '1611',
      c: null,
      e: 0
    },
    {
      xy: '1711',
      c: null,
      e: 0
    },
    {
      xy: '1811',
      c: null,
      e: 0
    },
    {
      xy: '1911',
      c: null,
      e: 0
    },
    {
      xy: '2011',
      c: null,
      e: 0
    },
    {
      xy: '2111',
      c: null,
      e: 0
    },
    {
      xy: '2211',
      c: null,
      e: 0
    },
    {
      xy: '2311',
      c: null,
      e: 0
    },
    {
      xy: '2411',
      c: null,
      e: 0
    },
    {
      xy: '2511',
      c: null,
      e: 0
    },
    {
      xy: '0112',
      c: null,
      e: 0
    },
    {
      xy: '0212',
      c: null,
      e: 0
    },
    {
      xy: '0312',
      c: null,
      e: 0
    },
    {
      xy: '0412',
      c: null,
      e: 0
    },
    {
      xy: '0512',
      c: null,
      e: 0
    },
    {
      xy: '0612',
      c: null,
      e: 0
    },
    {
      xy: '0712',
      c: null,
      e: 0
    },
    {
      xy: '0812',
      c: null,
      e: 0
    },
    {
      xy: '0912',
      c: null,
      e: 0
    },
    {
      xy: '1012',
      c: null,
      e: 0
    },
    {
      xy: '1112',
      c: null,
      e: 0
    },
    {
      xy: '1212',
      c: null,
      e: 0
    },
    {
      xy: '1312',
      c: null,
      e: 0
    },
    {
      xy: '1412',
      c: null,
      e: 0
    },
    {
      xy: '1512',
      c: null,
      e: 0
    },
    {
      xy: '1612',
      c: null,
      e: 0
    },
    {
      xy: '1712',
      c: null,
      e: 0
    },
    {
      xy: '1812',
      c: null,
      e: 0
    },
    {
      xy: '1912',
      c: null,
      e: 0
    },
    {
      xy: '2012',
      c: null,
      e: 0
    },
    {
      xy: '2112',
      c: null,
      e: 0
    },
    {
      xy: '2212',
      c: null,
      e: 0
    },
    {
      xy: '2312',
      c: null,
      e: 0
    },
    {
      xy: '2412',
      c: null,
      e: 0
    },
    {
      xy: '2512',
      c: null,
      e: 0
    },
    {
      xy: '0113',
      c: null,
      e: 0
    },
    {
      xy: '0213',
      c: null,
      e: 0
    },
    {
      xy: '0313',
      c: null,
      e: 0
    },
    {
      xy: '0413',
      c: null,
      e: 0
    },
    {
      xy: '0513',
      c: null,
      e: 0
    },
    {
      xy: '0613',
      c: null,
      e: 0
    },
    {
      xy: '0713',
      c: null,
      e: 0
    },
    {
      xy: '0813',
      c: null,
      e: 0
    },
    {
      xy: '0913',
      c: null,
      e: 0
    },
    {
      xy: '1013',
      c: null,
      e: 0
    },
    {
      xy: '1113',
      c: null,
      e: 0
    },
    {
      xy: '1213',
      c: null,
      e: 0
    },
    {
      xy: '1313',
      c: null,
      e: 0
    },
    {
      xy: '1413',
      c: null,
      e: 0
    },
    {
      xy: '1513',
      c: null,
      e: 0
    },
    {
      xy: '1613',
      c: null,
      e: 0
    },
    {
      xy: '1713',
      c: null,
      e: 0
    },
    {
      xy: '1813',
      c: null,
      e: 0
    },
    {
      xy: '1913',
      c: null,
      e: 0
    },
    {
      xy: '2013',
      c: null,
      e: 0
    },
    {
      xy: '2113',
      c: null,
      e: 0
    },
    {
      xy: '2213',
      c: null,
      e: 0
    },
    {
      xy: '2313',
      c: null,
      e: 0
    },
    {
      xy: '2413',
      c: null,
      e: 0
    },
    {
      xy: '2513',
      c: null,
      e: 0
    },
    {
      xy: '0114',
      c: null,
      e: 0
    },
    {
      xy: '0214',
      c: null,
      e: 0
    },
    {
      xy: '0314',
      c: null,
      e: 0
    },
    {
      xy: '0414',
      c: null,
      e: 0
    },
    {
      xy: '0514',
      c: null,
      e: 0
    },
    {
      xy: '0614',
      c: null,
      e: 0
    },
    {
      xy: '0714',
      c: null,
      e: 0
    },
    {
      xy: '0814',
      c: null,
      e: 0
    },
    {
      xy: '0914',
      c: null,
      e: 0
    },
    {
      xy: '1014',
      c: null,
      e: 0
    },
    {
      xy: '1114',
      c: null,
      e: 0
    },
    {
      xy: '1214',
      c: null,
      e: 0
    },
    {
      xy: '1314',
      c: null,
      e: 0
    },
    {
      xy: '1414',
      c: null,
      e: 0
    },
    {
      xy: '1514',
      c: null,
      e: 0
    },
    {
      xy: '1614',
      c: null,
      e: 0
    },
    {
      xy: '1714',
      c: null,
      e: 0
    },
    {
      xy: '1814',
      c: null,
      e: 0
    },
    {
      xy: '1914',
      c: null,
      e: 0
    },
    {
      xy: '2014',
      c: null,
      e: 0
    },
    {
      xy: '2114',
      c: null,
      e: 0
    },
    {
      xy: '2214',
      c: null,
      e: 0
    },
    {
      xy: '2314',
      c: null,
      e: 0
    },
    {
      xy: '2414',
      c: null,
      e: 0
    },
    {
      xy: '2514',
      c: null,
      e: 0
    },
    {
      xy: '0115',
      c: null,
      e: 0
    },
    {
      xy: '0215',
      c: null,
      e: 0
    },
    {
      xy: '0315',
      c: null,
      e: 0
    },
    {
      xy: '0415',
      c: null,
      e: 0
    },
    {
      xy: '0515',
      c: null,
      e: 0
    },
    {
      xy: '0615',
      c: null,
      e: 0
    },
    {
      xy: '0715',
      c: null,
      e: 0
    },
    {
      xy: '0815',
      c: null,
      e: 0
    },
    {
      xy: '0915',
      c: null,
      e: 0
    },
    {
      xy: '1015',
      c: null,
      e: 0
    },
    {
      xy: '1115',
      c: null,
      e: 0
    },
    {
      xy: '1215',
      c: null,
      e: 0
    },
    {
      xy: '1315',
      c: null,
      e: 0
    },
    {
      xy: '1415',
      c: null,
      e: 0
    },
    {
      xy: '1515',
      c: null,
      e: 0
    },
    {
      xy: '1615',
      c: null,
      e: 0
    },
    {
      xy: '1715',
      c: null,
      e: 0
    },
    {
      xy: '1815',
      c: null,
      e: 0
    },
    {
      xy: '1915',
      c: null,
      e: 0
    },
    {
      xy: '2015',
      c: null,
      e: 0
    },
    {
      xy: '2115',
      c: null,
      e: 0
    },
    {
      xy: '2215',
      c: null,
      e: 0
    },
    {
      xy: '2315',
      c: null,
      e: 0
    },
    {
      xy: '2415',
      c: null,
      e: 0
    },
    {
      xy: '2515',
      c: null,
      e: 0
    },
    {
      xy: '0116',
      c: null,
      e: 0
    },
    {
      xy: '0216',
      c: null,
      e: 0
    },
    {
      xy: '0316',
      c: null,
      e: 0
    },
    {
      xy: '0416',
      c: null,
      e: 0
    },
    {
      xy: '0516',
      c: null,
      e: 0
    },
    {
      xy: '0616',
      c: null,
      e: 0
    },
    {
      xy: '0716',
      c: null,
      e: 0
    },
    {
      xy: '0816',
      c: null,
      e: 0
    },
    {
      xy: '0916',
      c: null,
      e: 0
    },
    {
      xy: '1016',
      c: null,
      e: 0
    },
    {
      xy: '1116',
      c: null,
      e: 0
    },
    {
      xy: '1216',
      c: null,
      e: 0
    },
    {
      xy: '1316',
      c: null,
      e: 0
    },
    {
      xy: '1416',
      c: null,
      e: 0
    },
    {
      xy: '1516',
      c: null,
      e: 0
    },
    {
      xy: '1616',
      c: null,
      e: 0
    },
    {
      xy: '1716',
      c: null,
      e: 0
    },
    {
      xy: '1816',
      c: null,
      e: 0
    },
    {
      xy: '1916',
      c: null,
      e: 0
    },
    {
      xy: '2016',
      c: null,
      e: 0
    },
    {
      xy: '2116',
      c: null,
      e: 0
    },
    {
      xy: '2216',
      c: null,
      e: 0
    },
    {
      xy: '2316',
      c: null,
      e: 0
    },
    {
      xy: '2416',
      c: null,
      e: 0
    },
    {
      xy: '2516',
      c: null,
      e: 0
    },
    {
      xy: '0117',
      c: null,
      e: 0
    },
    {
      xy: '0217',
      c: null,
      e: 0
    },
    {
      xy: '0317',
      c: null,
      e: 0
    },
    {
      xy: '0417',
      c: null,
      e: 0
    },
    {
      xy: '0517',
      c: null,
      e: 0
    },
    {
      xy: '0617',
      c: null,
      e: 0
    },
    {
      xy: '0717',
      c: null,
      e: 0
    },
    {
      xy: '0817',
      c: null,
      e: 0
    },
    {
      xy: '0917',
      c: null,
      e: 0
    },
    {
      xy: '1017',
      c: null,
      e: 0
    },
    {
      xy: '1117',
      c: null,
      e: 0
    },
    {
      xy: '1217',
      c: null,
      e: 0
    },
    {
      xy: '1317',
      c: null,
      e: 0
    },
    {
      xy: '1417',
      c: null,
      e: 0
    },
    {
      xy: '1517',
      c: null,
      e: 0
    },
    {
      xy: '1617',
      c: null,
      e: 0
    },
    {
      xy: '1717',
      c: null,
      e: 0
    },
    {
      xy: '1817',
      c: null,
      e: 0
    },
    {
      xy: '1917',
      c: null,
      e: 0
    },
    {
      xy: '2017',
      c: null,
      e: 0
    },
    {
      xy: '2117',
      c: null,
      e: 0
    },
    {
      xy: '2217',
      c: null,
      e: 0
    },
    {
      xy: '2317',
      c: null,
      e: 0
    },
    {
      xy: '2417',
      c: null,
      e: 0
    },
    {
      xy: '2517',
      c: null,
      e: 0
    },
    {
      xy: '0118',
      c: null,
      e: 0
    },
    {
      xy: '0218',
      c: null,
      e: 0
    },
    {
      xy: '0318',
      c: null,
      e: 0
    },
    {
      xy: '0418',
      c: null,
      e: 0
    },
    {
      xy: '0518',
      c: null,
      e: 0
    },
    {
      xy: '0618',
      c: null,
      e: 0
    },
    {
      xy: '0718',
      c: null,
      e: 0
    },
    {
      xy: '0818',
      c: null,
      e: 0
    },
    {
      xy: '0918',
      c: null,
      e: 0
    },
    {
      xy: '1018',
      c: null,
      e: 0
    },
    {
      xy: '1118',
      c: null,
      e: 0
    },
    {
      xy: '1218',
      c: null,
      e: 0
    },
    {
      xy: '1318',
      c: null,
      e: 0
    },
    {
      xy: '1418',
      c: null,
      e: 0
    },
    {
      xy: '1518',
      c: null,
      e: 0
    },
    {
      xy: '1618',
      c: null,
      e: 0
    },
    {
      xy: '1718',
      c: null,
      e: 0
    },
    {
      xy: '1818',
      c: null,
      e: 0
    },
    {
      xy: '1918',
      c: null,
      e: 0
    },
    {
      xy: '2018',
      c: null,
      e: 0
    },
    {
      xy: '2118',
      c: null,
      e: 0
    },
    {
      xy: '2218',
      c: null,
      e: 0
    },
    {
      xy: '2318',
      c: null,
      e: 0
    },
    {
      xy: '2418',
      c: null,
      e: 0
    },
    {
      xy: '2518',
      c: null,
      e: 0
    },
    {
      xy: '0119',
      c: null,
      e: 0
    },
    {
      xy: '0219',
      c: null,
      e: 0
    },
    {
      xy: '0319',
      c: null,
      e: 0
    },
    {
      xy: '0419',
      c: null,
      e: 0
    },
    {
      xy: '0519',
      c: null,
      e: 0
    },
    {
      xy: '0619',
      c: null,
      e: 0
    },
    {
      xy: '0719',
      c: null,
      e: 0
    },
    {
      xy: '0819',
      c: null,
      e: 0
    },
    {
      xy: '0919',
      c: null,
      e: 0
    },
    {
      xy: '1019',
      c: null,
      e: 0
    },
    {
      xy: '1119',
      c: null,
      e: 0
    },
    {
      xy: '1219',
      c: null,
      e: 0
    },
    {
      xy: '1319',
      c: null,
      e: 0
    },
    {
      xy: '1419',
      c: null,
      e: 0
    },
    {
      xy: '1519',
      c: null,
      e: 0
    },
    {
      xy: '1619',
      c: null,
      e: 0
    },
    {
      xy: '1719',
      c: null,
      e: 0
    },
    {
      xy: '1819',
      c: null,
      e: 0
    },
    {
      xy: '1919',
      c: null,
      e: 0
    },
    {
      xy: '2019',
      c: null,
      e: 0
    },
    {
      xy: '2119',
      c: null,
      e: 0
    },
    {
      xy: '2219',
      c: null,
      e: 0
    },
    {
      xy: '2319',
      c: null,
      e: 0
    },
    {
      xy: '2419',
      c: null,
      e: 0
    },
    {
      xy: '2519',
      c: null,
      e: 0
    },
    {
      xy: '0120',
      c: null,
      e: 0
    },
    {
      xy: '0220',
      c: null,
      e: 0
    },
    {
      xy: '0320',
      c: null,
      e: 0
    },
    {
      xy: '0420',
      c: null,
      e: 0
    },
    {
      xy: '0520',
      c: null,
      e: 0
    },
    {
      xy: '0620',
      c: null,
      e: 0
    },
    {
      xy: '0720',
      c: null,
      e: 0
    },
    {
      xy: '0820',
      c: null,
      e: 0
    },
    {
      xy: '0920',
      c: null,
      e: 0
    },
    {
      xy: '1020',
      c: null,
      e: 0
    },
    {
      xy: '1120',
      c: null,
      e: 0
    },
    {
      xy: '1220',
      c: null,
      e: 0
    },
    {
      xy: '1320',
      c: null,
      e: 0
    },
    {
      xy: '1420',
      c: null,
      e: 0
    },
    {
      xy: '1520',
      c: null,
      e: 0
    },
    {
      xy: '1620',
      c: null,
      e: 0
    },
    {
      xy: '1720',
      c: null,
      e: 0
    },
    {
      xy: '1820',
      c: null,
      e: 0
    },
    {
      xy: '1920',
      c: null,
      e: 0
    },
    {
      xy: '2020',
      c: null,
      e: 0
    },
    {
      xy: '2120',
      c: null,
      e: 0
    },
    {
      xy: '2220',
      c: null,
      e: 0
    },
    {
      xy: '2320',
      c: null,
      e: 0
    },
    {
      xy: '2420',
      c: null,
      e: 0
    },
    {
      xy: '2520',
      c: null,
      e: 0
    },
    {
      xy: '0121',
      c: null,
      e: 0
    },
    {
      xy: '0221',
      c: null,
      e: 0
    },
    {
      xy: '0321',
      c: null,
      e: 0
    },
    {
      xy: '0421',
      c: null,
      e: 0
    },
    {
      xy: '0521',
      c: null,
      e: 0
    },
    {
      xy: '0621',
      c: null,
      e: 0
    },
    {
      xy: '0721',
      c: null,
      e: 0
    },
    {
      xy: '0821',
      c: null,
      e: 0
    },
    {
      xy: '0921',
      c: null,
      e: 0
    },
    {
      xy: '1021',
      c: null,
      e: 0
    },
    {
      xy: '1121',
      c: null,
      e: 0
    },
    {
      xy: '1221',
      c: null,
      e: 0
    },
    {
      xy: '1321',
      c: null,
      e: 0
    },
    {
      xy: '1421',
      c: null,
      e: 0
    },
    {
      xy: '1521',
      c: null,
      e: 0
    },
    {
      xy: '1621',
      c: null,
      e: 0
    },
    {
      xy: '1721',
      c: null,
      e: 0
    },
    {
      xy: '1821',
      c: null,
      e: 0
    },
    {
      xy: '1921',
      c: null,
      e: 0
    },
    {
      xy: '2021',
      c: null,
      e: 0
    },
    {
      xy: '2121',
      c: null,
      e: 0
    },
    {
      xy: '2221',
      c: null,
      e: 0
    },
    {
      xy: '2321',
      c: null,
      e: 0
    },
    {
      xy: '2421',
      c: null,
      e: 0
    },
    {
      xy: '2521',
      c: null,
      e: 0
    },
    {
      xy: '0122',
      c: null,
      e: 0
    },
    {
      xy: '0222',
      c: null,
      e: 0
    },
    {
      xy: '0322',
      c: null,
      e: 0
    },
    {
      xy: '0422',
      c: null,
      e: 0
    },
    {
      xy: '0522',
      c: null,
      e: 0
    },
    {
      xy: '0622',
      c: null,
      e: 0
    },
    {
      xy: '0722',
      c: null,
      e: 0
    },
    {
      xy: '0822',
      c: null,
      e: 0
    },
    {
      xy: '0922',
      c: null,
      e: 0
    },
    {
      xy: '1022',
      c: null,
      e: 0
    },
    {
      xy: '1122',
      c: null,
      e: 0
    },
    {
      xy: '1222',
      c: null,
      e: 0
    },
    {
      xy: '1322',
      c: null,
      e: 0
    },
    {
      xy: '1422',
      c: null,
      e: 0
    },
    {
      xy: '1522',
      c: null,
      e: 0
    },
    {
      xy: '1622',
      c: null,
      e: 0
    },
    {
      xy: '1722',
      c: null,
      e: 0
    },
    {
      xy: '1822',
      c: null,
      e: 0
    },
    {
      xy: '1922',
      c: null,
      e: 0
    },
    {
      xy: '2022',
      c: null,
      e: 0
    },
    {
      xy: '2122',
      c: null,
      e: 0
    },
    {
      xy: '2222',
      c: null,
      e: 0
    },
    {
      xy: '2322',
      c: null,
      e: 0
    },
    {
      xy: '2422',
      c: null,
      e: 0
    },
    {
      xy: '2522',
      c: null,
      e: 0
    },
    {
      xy: '0123',
      c: null,
      e: 0
    },
    {
      xy: '0223',
      c: null,
      e: 0
    },
    {
      xy: '0323',
      c: null,
      e: 0
    },
    {
      xy: '0423',
      c: null,
      e: 0
    },
    {
      xy: '0523',
      c: null,
      e: 0
    },
    {
      xy: '0623',
      c: null,
      e: 0
    },
    {
      xy: '0723',
      c: null,
      e: 0
    },
    {
      xy: '0823',
      c: null,
      e: 0
    },
    {
      xy: '0923',
      c: null,
      e: 0
    },
    {
      xy: '1023',
      c: null,
      e: 0
    },
    {
      xy: '1123',
      c: null,
      e: 0
    },
    {
      xy: '1223',
      c: null,
      e: 0
    },
    {
      xy: '1323',
      c: null,
      e: 0
    },
    {
      xy: '1423',
      c: null,
      e: 0
    },
    {
      xy: '1523',
      c: null,
      e: 0
    },
    {
      xy: '1623',
      c: null,
      e: 0
    },
    {
      xy: '1723',
      c: null,
      e: 0
    },
    {
      xy: '1823',
      c: null,
      e: 0
    },
    {
      xy: '1923',
      c: null,
      e: 0
    },
    {
      xy: '2023',
      c: null,
      e: 0
    },
    {
      xy: '2123',
      c: null,
      e: 0
    },
    {
      xy: '2223',
      c: null,
      e: 0
    },
    {
      xy: '2323',
      c: null,
      e: 0
    },
    {
      xy: '2423',
      c: null,
      e: 0
    },
    {
      xy: '2523',
      c: null,
      e: 0
    },
    {
      xy: '0124',
      c: null,
      e: 0
    },
    {
      xy: '0224',
      c: null,
      e: 0
    },
    {
      xy: '0324',
      c: null,
      e: 0
    },
    {
      xy: '0424',
      c: null,
      e: 0
    },
    {
      xy: '0524',
      c: null,
      e: 0
    },
    {
      xy: '0624',
      c: null,
      e: 0
    },
    {
      xy: '0724',
      c: null,
      e: 0
    },
    {
      xy: '0824',
      c: null,
      e: 0
    },
    {
      xy: '0924',
      c: null,
      e: 0
    },
    {
      xy: '1024',
      c: null,
      e: 0
    },
    {
      xy: '1124',
      c: null,
      e: 0
    },
    {
      xy: '1224',
      c: null,
      e: 0
    },
    {
      xy: '1324',
      c: null,
      e: 0
    },
    {
      xy: '1424',
      c: null,
      e: 0
    },
    {
      xy: '1524',
      c: null,
      e: 0
    },
    {
      xy: '1624',
      c: null,
      e: 0
    },
    {
      xy: '1724',
      c: null,
      e: 0
    },
    {
      xy: '1824',
      c: null,
      e: 0
    },
    {
      xy: '1924',
      c: null,
      e: 0
    },
    {
      xy: '2024',
      c: null,
      e: 0
    },
    {
      xy: '2124',
      c: null,
      e: 0
    },
    {
      xy: '2224',
      c: null,
      e: 0
    },
    {
      xy: '2324',
      c: null,
      e: 0
    },
    {
      xy: '2424',
      c: null,
      e: 0
    },
    {
      xy: '2524',
      c: null,
      e: 0
    },
    {
      xy: '0125',
      c: null,
      e: 0
    },
    {
      xy: '0225',
      c: null,
      e: 0
    },
    {
      xy: '0325',
      c: null,
      e: 0
    },
    {
      xy: '0425',
      c: null,
      e: 0
    },
    {
      xy: '0525',
      c: null,
      e: 0
    },
    {
      xy: '0625',
      c: null,
      e: 0
    },
    {
      xy: '0725',
      c: null,
      e: 0
    },
    {
      xy: '0825',
      c: null,
      e: 0
    },
    {
      xy: '0925',
      c: null,
      e: 0
    },
    {
      xy: '1025',
      c: null,
      e: 0
    },
    {
      xy: '1125',
      c: null,
      e: 0
    },
    {
      xy: '1225',
      c: null,
      e: 0
    },
    {
      xy: '1325',
      c: null,
      e: 0
    },
    {
      xy: '1425',
      c: null,
      e: 0
    },
    {
      xy: '1525',
      c: null,
      e: 0
    },
    {
      xy: '1625',
      c: null,
      e: 0
    },
    {
      xy: '1725',
      c: null,
      e: 0
    },
    {
      xy: '1825',
      c: null,
      e: 0
    },
    {
      xy: '1925',
      c: null,
      e: 0
    },
    {
      xy: '2025',
      c: null,
      e: 0
    },
    {
      xy: '2125',
      c: null,
      e: 0
    },
    {
      xy: '2225',
      c: null,
      e: 0
    },
    {
      xy: '2325',
      c: null,
      e: 0
    },
    {
      xy: '2425',
      c: null,
      e: 0
    },
    {
      xy: '2525',
      c: null,
      e: 0
    }
  ];

