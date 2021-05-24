import * as React from 'react';
import { Helmet } from 'react-helmet';
import { H1, P1, P3 } from '../../Components/Text';

import './index.scss';

const Timer = ({ duration, onEnd }: { duration: number, onEnd?: () => void }) => {
  const [s, setS] = React.useState(0);
  React.useEffect(() => {
    let unmounted = false;
    const tick = () => {
      if (unmounted)
        return;
      setS(i => {
        if (i >= duration && onEnd)
          setTimeout(onEnd, 10);
        return i + 1;
      });
      setTimeout(tick, 1000);
    }
    setTimeout(tick, 1000);
    return () => {
      unmounted = true;
    }
  }, [ duration, onEnd ]);
  
  const time = Math.max(0, duration - s),
        min = ~~(time / 60),
        sec = time - min * 60;
  return (
    <>
      {String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}
    </>
  )
}

const Page404 = () => {

  // const [blowup, setBlowup] = React.useState(false);

  // React.useEffect(() => {
  //   console.log('blowup=', blowup)
  //   if (blowup && !document.body?.className?.includes?.('blowup'))
  //     document.body.className += 'blowup';
  // }, [ blowup ]);

  return (
    <div className="Page404">
      {/* <Helmet>
          <title>StudSearch — 404</title>
          <meta name="title" content="StudSearch — 404" />
          <meta property="og:title" content="StudSearch — 404" />
          <meta name="twitter:title" content="StudSearch — 404" />
      </Helmet> */}
      <div className="Content">
        <H1>404.</H1>
        <br />
        <P1><b>Оце халепа!</b></P1>
        <P1>Напевно ми щось проґавили. Напишіть <a href="https://t.me/dkaraush">мені</a>, якщо дійсно щось не спрацювало.</P1>
        <br />
        <br />
        <P1>А якщо ж ви розробник і граєтесь з сайтом, то ласкаво просимо в нашу команду! :)</P1>
        {/* <P1>Тепер через <Timer duration={2} onEnd={() => setBlowup(true)} /> сайт вибухне...</P1> */}
      </div>
    </div>
  );
}

export default Page404;