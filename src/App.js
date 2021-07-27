import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import Header from './Components/Header/Header';
import Login from './views/Login/Login';
import NavBar from './Components/NavBar/NavBar';
import Institutes from './views/Institutes/Institutes';
import Notifications from './views/Notifications/Notifications';
import Blogs from './views/Blogs/Blogs';
import Recommendations from './views/Recommendations/Recommendations';
import Topics from './views/Topics/Topics';
import Institute from './views/Institute/Institute';
import Notification from './views/Notification/Notification';
import Blog from './views/Blog/Blog';
import Recommendation from './views/Recommendation/Recommendation';
import Topic from './views/Topic/Topic';
import Students from './views/Students/Students';
import InstituteNotifications from './views/InstituteNotifications/InstituteNotifications';
import Tests from './views/Tests/Tests';
import Student from './views/Student/Student';
import InstituteNotification from './views/InstituteNotification/InstituteNotification';
import Test from './views/Test/Test';
import TestPaper from './views/TestPaper/TestPaper';
import TestResponseList from './views/TestResponseList/TestResponseList';
import TestResponse from './views/TestResponse/TestResponse';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = (props) => {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) 
      props.history.push('/login');
  }, []);

  const mainNavElements = [
    {
      title: 'Institute',
      link: '/institute'
    },
    {
      title: 'Notification',
      link: '/notification'
    },
    {
      title: 'Blogs & FAQs',
      link: '/blogs&faqs'
    },
    {
      title: 'Recommendation',
      link: '/recommendation'
    },
    {
      title: 'Topic',
      link: '/topic'
    }
  ];

  const instituteNavElements = (props) => ([
    {
      title: 'Student',
      link: `/institute/${props.match.params.id}/student`
    },
    {
      title: 'Notification',
      link: `/institute/${props.match.params.id}/notification`
    },
    {
      title: 'Test',
      link: `/institute/${props.match.params.id}/test`
    }
  ])

  return (
    <div className="App">
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route path='/' component={Header} />
      </Switch>

      <div className='Content-Wrapper'>
        <Switch>
          <Route exact path='/institute/:id/:sub' render={(props) => <NavBar navElements={instituteNavElements(props)} />} />
          <Route exact path='/:sub' render={() => <NavBar navElements={mainNavElements} />} />
        </Switch>

        <Switch>
          <Route exact path='/institute' component={Institutes} />
          <Route exact path='/notification' component={Notifications} />
          <Route exact path='/blogs&faqs' component={Blogs} />
          <Route exact path='/recommendation' component={Recommendations} />
          <Route exact path='/topic' component={Topics} />
          <Route exact path='/institute/:id' component={Institute} />
          <Route exact path='/notification/:id' component={Notification} />
          <Route exact path='/blogs&faqs/:id' component={Blog} />
          <Route exact path='/recommendation/:id' component={Recommendation} />
          <Route exact path='/topic/:id' component={Topic} />
          <Route exact path='/institute/:instituteId/student' component={Students} />
          <Route exact path='/institute/:instituteId/notification' component={InstituteNotifications} />
          <Route exact path='/institute/:instituteId/test' component={Tests} />
          <Route exact path='/institute/:instituteId/student/:id' component={Student} />
          <Route exact path='/institute/:instituteId/notification/:id' component={InstituteNotification} />
          <Route exact path='/institute/:instituteId/test/:id' component={Test} />
          <Route exact path='/institute/:instituteId/test/:testId/testPaper' component={TestPaper} />
          <Route exact path='/institute/:instituteId/test/:testId/testResponse' component={TestResponseList} />
          <Route exact path='/institute/:instituteId/test/:testId/testResponse/:userId' component={TestResponse} />
        </Switch>
      </div>

      <ToastContainer />
    </div>
  )
}

export default App;
