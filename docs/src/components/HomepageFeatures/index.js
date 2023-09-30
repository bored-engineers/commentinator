import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/easy-use.svg').default,
    description: (
      <>
        Commentinator is very easy to install in your current project as it just require one library import, a little configuration and putting one html tag.
      </>
    ),
  },
  {
    title: 'Cost Effective',
    Svg: require('@site/static/img/cost-effective.svg').default,
    description: (
      <>
        Commentinator is based on serverless principal, hence it is very cost effective and allows you to pay as you go.
      </>
    ),
  },
  {
    title: 'Powered by Firebase',
    Svg: require('@site/static/img/Firebase-firestore-db.svg').default,
    description: (
      <>
        Commentinator's uses firebase firestore database, which is easy to configure, maintain and monitor.
      </>
    ),
  },
  
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
