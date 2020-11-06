import Axios from 'axios';
import React, { useEffect, useState } from 'react';

import Button from '../components/Buttons/Button.component';
import Layout from '../components/Layout/Layout.component';
import ResourceCard from '../components/RecourceCard/ResourceCard.component';
import resourceOffline from '../utils/resources-for-offline';
import styles from '../pageStyles/resources.module.scss';

const Resources = ({ resourceData }) => {
  const initData = resourceData.filter((record) => {
    if (
      record.COVID_income_loss == '' &&
      record.proof_of_experience == '' &&
      record.half_of_income == ''
    ) {
      return record;
    }
  });
  useEffect(() => {
    Axios.get('/api/resource-data');
  }, []);

  //Creating a state for the different filtering and sorting controllers
  const [financialGroup, setFinancialGroup] = useState({
    pandemicImpact: false,
    industryProfessional: false,
    incomeMin: false,
  });

  const [roleGroup, setRoleGroup] = useState({
    musician: false,
    engineer: false,
    business: false,
    educator: false,
  });
  const [years, setYears] = useState('1');

  const [sort, setSort] = useState('a-z');

  const [status, setStatus] = useState(['all']);

  const [resource, setResource] = useState(initData);

  const [resourceReference, setResourceReference] = useState(resourceData);

  //Sets the financialGroup state to be equal to the buttons pressed
  //FINANCIALGROUP Handlers
  const handleFinancialFilterButton = (id) => {
    setFinancialGroup((financialGroup) => ({
      ...financialGroup,
      [id]: !financialGroup[id],
    }));
  };
  const handelFinancialButtonStyle = (id) => {
    if (financialGroup[id] == true) {
      return styles.clicked;
    } else {
      return styles.unClicked;
    }
  };
  //END FINANCIALGROUP Handlers

  //ROLEGROUP Handlers
  const handleRolesFilterButton = (id) => {
    setRoleGroup((roleGroup) => ({ ...roleGroup, [id]: !roleGroup[id] }));
  };

  const handleRoleButtonStyles = (id) => {
    if (roleGroup[id] == true) {
      return styles.textClicked;
    } else {
      return styles.textUnClicked;
    }
  };
  //END ROLEGROUP Handlers

  //Status Handlers!!!/////
  //Sets status based on the id of the targets
  const handleStatusFilterButton = (id) => {
    if (id == 'all') {
      setStatus(['all']);
    } else if (id != 'all' && status.includes('all')) {
      setStatus([id]);
    } else if (status == [id]) {
      setStatus(['all']);
    } else if (id != 'all' && status.includes(id)) {
      if (id != 'all' && status.length == 1 && status.indexOf('all') == -1) {
        setStatus(['all']);
      } else {
        const newStatus = status.filter((option) => option != id);
        setStatus(newStatus);
      }
    } else {
      setStatus((status) => [...status, id]);
    }
  };
  //Handles the styling of the button based on the status
  const handleStatusButtonStyle = (id) => {
    if (status.includes(id)) {
      return styles.clicked;
    } else {
      return styles.unClicked;
    }
  };
  //END STATUS HANDLERS////////
  /////////////

  ///
  //SORT BUTTONS are handled on their components
  const handleSortButtonStyle = (id) => {
    if (sort === id) {
      return styles.textClicked;
    } else {
      return styles.textUnClicked;
    }
  };
  //////

  //FILTER RESOURCES
  useEffect(() => {
    //This is what we will refer to for filtering
    // const stateReference = {
    // 	...financialGroup,
    // 	...roleGroup,
    // 	status,
    // 	years,
    // 	sort,
    // };
    let statusFilter,
      financialFilter,
      roleFilter,
      yearsFilter,
      newResource = [];

    //we will array.filter or array.map the resourceReference to set resource and render the filtered results
    console.log(status);
    //FINANCIALGROUP FILTERING

    //Update the resources rendered based on which of the three financialGroup Buttons is pressed
    //If a button is unselected, it must be "unfiltered"

    //STATUS FILTERING
    if (status.includes('all')) {
      return setResource(resourceReference);
    } else {
      statusFilter = resourceReference.filter((item) => {
        return status.includes(item.status.toLowerCase());
      });
    }
    newResource = [...newResource, ...statusFilter];
    setResource(newResource);
  }, [status, financialGroup]);

  //handles the removal of irrelavent items
  const handleNotRelevantClick = (key) => {
    setResource(
      resource.filter((resource) => {
        return resource._id !== key;
      }),
    );
  };

  return (
    <Layout>
      <div className={styles.controllers}>
        <h1>
          Are you a musician that has been affected by the COVID-19 Pandemic?
        </h1>
        <p className={styles.subtitle}>
          We’ve built a clear and valuable toolkit of Support Resources
          available to Austin musicians and industry.
        </p>
        <div className={styles.financialGroup}>
          <h2>Select what you can provide and/or is true for you…</h2>

          <Button
            filterClick={handleFinancialFilterButton}
            className={handelFinancialButtonStyle('pandemicImpact')}
            id="pandemicImpact"
          >
            Proof that you were financially impacted by the pandemic. (e.g. lost
            gigs, shows, bookings, contracts, unemployment etc.)
          </Button>
          <Button
            filterClick={handleFinancialFilterButton}
            className={handelFinancialButtonStyle('industryProfessional')}
            id="industryProfessional"
          >
            Proof of professional musicianship and/or music industry employment.
          </Button>
          <Button
            filterClick={handleFinancialFilterButton}
            className={handelFinancialButtonStyle('incomeMin')}
            id="incomeMin"
          >
            The music industry is over 50% of my income
          </Button>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.rolesGroup}>
          <a>
            <p
              id="musician"
              className={handleRoleButtonStyles('musician')}
              onClick={() => handleRolesFilterButton('musician')}
            >
              Musician
            </p>
          </a>
          <div className={styles.vertDivider}></div>
          <a>
            <p
              id="engineer"
              className={handleRoleButtonStyles('engineer')}
              onClick={() => handleRolesFilterButton('engineer')}
            >
              Engineer/Crew
            </p>
          </a>
          <div className={styles.vertDivider}></div>
          <a>
            <p
              id="business"
              className={handleRoleButtonStyles('business')}
              onClick={() => handleRolesFilterButton('business')}
            >
              Business
            </p>
          </a>
          <div className={styles.vertDivider}></div>
          <a>
            <p
              id="educator"
              className={handleRoleButtonStyles('educator')}
              onClick={() => handleRolesFilterButton('educator')}
            >
              Educator
            </p>
          </a>
        </div>
        <div className={styles.yearsDiv}>
          <p>{years == '20' ? '20+' : years}</p>
          <label>
            <span>Years in industry:</span> 1
            <input
              id="years"
              type="range"
              min="1"
              max="20"
              step="1"
              value={years}
              onChange={() => setYears(document.getElementById('years').value)}
            ></input>
            20+
          </label>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.filtersAndSortContainer}>
          <div className={styles.filterContainer}>
            <p>Would you like to see?</p>
            <Button
              filterClick={handleStatusFilterButton}
              className={handleStatusButtonStyle('all')}
              status={status}
              id="all"
            >
              All
            </Button>
            <Button
              filterClick={handleStatusFilterButton}
              className={handleStatusButtonStyle('open')}
              status={status}
              id="open"
            >
              Open
            </Button>
            <Button
              filterClick={handleStatusFilterButton}
              className={handleStatusButtonStyle('paused-waitlist')}
              status={status}
              id="paused-waitlist"
            >
              Waitlisted
            </Button>
            <Button
              filterClick={handleStatusFilterButton}
              className={handleStatusButtonStyle('closed')}
              status={status}
              id="closed"
            >
              Closed
            </Button>
          </div>
          <div className={styles.sortContainer}>
            <span>SORT:</span>
            <p
              className={handleSortButtonStyle('a-z')}
              onClick={() => setSort('a-z')}
            >
              A-Z
            </p>
            <div className={styles.vertDividerThin}></div>
            <p
              className={handleSortButtonStyle('z-a')}
              onClick={() => setSort('z-a')}
            >
              Z-A
            </p>
            <div className={styles.vertDividerThin}></div>
            <p
              className={handleSortButtonStyle('$')}
              onClick={() => setSort('$')}
            >
              $
            </p>
          </div>
        </div>
      </div>
      <div className={styles.resultsContainer}>
        {resource.map((data) => {
          return (
            <ResourceCard
              key={data['_id']}
              name={data.organization}
              amount={data.amount}
              link={data.link}
              status={data.status}
              handleNotRelevantClick={() => handleNotRelevantClick(data['_id'])}
              //eligibilities={resource.eligibilities}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  //dbConnect();
  //const data = await Resource.find({}, "organization _id status");
  const data = resourceOffline;
  const string = JSON.stringify(data);
  const resourceData = JSON.parse(string);
  return {
    props: {
      resourceData,
    },
  };
}

export default Resources;
