import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addSharp, homeSharp, personCircleSharp } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import { useImmerReducer } from "use-immer";
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import { auth } from './firebase';
import { useEffect } from 'react';

const App: React.FC = () => {

  const initialState = {
    loggedIn: false,
    userId: ""
  }

  function appReducer(draft: any, action: any) {
    switch (action.type) {
      case "loggedIn":
          draft.loggedIn = true;
          draft.userId = action.value;
          return;
      case "userFetched":
          draft.user = action.value;
          return;
      case "loggedOut":
          draft.loggedIn = false;
          draft.userId = "";
          return;
    }
  }

  const [state, dispatch] = useImmerReducer(appReducer, initialState);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            dispatch({ type: "loggedIn", value: user?.uid });
        }
    });
}, []);

  return (
    <IonApp>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
            </Switch>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={homeSharp} />
              <IonLabel>Tab 1</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={addSharp} />
              <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={personCircleSharp} />
              <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      </DispatchContext.Provider>
      </StateContext.Provider>
    </IonApp>
  );
} 

export default App;
