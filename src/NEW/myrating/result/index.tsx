import * as React from 'react';
import Slider from 'react-slick';
import { useHistory, useParams } from 'react-router-dom';
import AppContent from '../../components/app/content';
import cx from 'classnames';
import html2canvas from 'html2canvas';
import Button from '../../components/button';

import { BurgerButton, HeaderMenuGroup, HeaderMenuButton, useAnimated } from '../../header';

import fulllogo from '../../header/fulllogo.svg';
import share from './share.svg';
import marker from './marker.svg';
import copy from './copy.svg';
import download from './download.svg';
import fulllogoRedhead from './fulllogoRedhead.svg';
import ukraine from './ukraine.png';
import geography from './geography.png';
import english from './english.png';
import france from './france.png';
import dna from './dna.png';
import spain from './spain.png';
import fire from './fire.png';
import hands from './hands.png';
import testTube from './testTube.png';
import abacus from './abacus.png';
import zhdun from './zhdun.png';
import germany from './germany.png';
import microscope from './microscope.png';
import sunflower from './sunflower.png';
import scroll from './scroll.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './index.scss';
// import { createPrinter } from 'typescript';

const GeoBallData =  {[100]:1356,[101]:1584,[103]:1814,[105]:1974,[106]:2128,[108]:2343,[110]:2511,[112]:2597,[114]:2797,[116]:2919,[118]:2971,[120]:2975,[122]:2979,[124]:3098,[127]:3041,[129]:3081,[131]:3121,[133]:3045,[135]:2980,[138]:2915,[140]:2864,[142]:2726,[144]:2610,[146]:2587,[148]:2549,[150]:2324,[152]:2353,[154]:2148,[155]:2123,[157]:2096,[159]:2022,[161]:1859,[162]:1755,[164]:1716,[165]:1652,[167]:1614,[168]:1535,[170]:1410,[171]:1389,[173]:1345,[174]:1219,[176]:1166,[177]:1057,[178]:1021,[179]:940,[181]:922,[182]:841,[183]:761,[184]:757,[185]:663,[186]:616,[187]:574,[188]:548,[189]:513,[190]:430,[191]:416,[192]:323,[193]:274,[194]:292,[195]:259,[196]:194,[197]:134,[198]:170,[199]:39,[200]:10};
const UkrBallData =  {[100]:5041,[102]:5173,[104]:5386,[106]:5742,[107]:5740,[109]:6026,[111]:6204,[113]:6152,[115]:6304,[118]:6407,[120]:6551,[122]:6574,[124]:6787,[126]:6782,[128]:6779,[130]:6821,[132]:6746,[135]:6735,[137]:6652,[139]:6559,[141]:6406,[143]:6258,[145]:6229,[147]:6048,[149]:5873,[151]:5786,[153]:5628,[155]:5264,[157]:5189,[159]:5063,[160]:4848,[162]:4752,[164]:4592,[166]:4455,[167]:4509,[169]:4268,[171]:4185,[173]:4145,[174]:4140,[176]:4034,[177]:3929,[179]:3779,[181]:3708,[182]:3579,[184]:3536,[185]:3351,[187]:3338,[188]:2958,[190]:2722,[191]:2494,[192]:2179,[194]:1752,[195]:1378,[196]:978,[197]:628,[198]:334,[199]:126,[200]:33};
const MathBallData = {[100]:12726,[105]:11024,[109]:9520,[113]:8133,[116]:7186,[119]:6377,[122]:5844,[124]:5247,[127]:4955,[129]:4586,[131]:4375,[133]:4157,[136]:4123,[138]:3918,[140]:3862,[142]:3609,[144]:3514,[146]:3386,[147]:3298,[149]:3184,[151]:3024,[153]:2888,[155]:2795,[156]:2688,[158]:2541,[160]:2369,[161]:2350,[163]:2244,[164]:2165,[166]:2009,[167]:1973,[169]:1777,[170]:1853,[172]:1705,[173]:1687,[174]:1586,[176]:1563,[177]:1539,[178]:1326,[180]:1463,[181]:1364,[182]:1377,[184]:1221,[185]:1266,[186]:1090,[187]:1077,[188]:986,[190]:942,[191]:925,[192]:787,[193]:656,[194]:525,[195]:468,[196]:365,[197]:293,[198]:237,[199]:73,[200]:148};
const BioBallData =  {[100]:592,[101]:716,[102]:872,[104]:1045,[105]:1235,[107]:1427,[109]:1767,[111]:1926,[113]:1996,[115]:2353,[117]:2523,[120]:2665,[122]:2741,[125]:2938,[127]:3006,[130]:2903,[133]:2909,[135]:2821,[138]:2774,[140]:2759,[143]:2577,[146]:2520,[148]:2339,[150]:2258,[152]:2020,[155]:1861,[157]:1748,[159]:1598,[160]:1483,[162]:1346,[164]:1285,[165]:1181,[167]:1077,[169]:988,[170]:900,[171]:899,[173]:857,[174]:775,[175]:756,[177]:705,[178]:690,[179]:668,[181]:592,[182]:576,[183]:573,[184]:530,[185]:494,[186]:527,[188]:402,[189]:424,[190]:391,[191]:384,[192]:357,[193]:319,[194]:285,[195]:273,[196]:240,[197]:209,[198]:179,[199]:145,[200]:115};

interface InfoSubjects {
  subject: string,
  emoji: any,
  id?: number
}

const infoSubjects: InfoSubjects[] = [
  // {
  //   subject: 'Українська мова і література',
  //   emoji: sunflower,
  // },
  {
    subject: 'Українська мова',
    emoji: ukraine,
    id: 1
  },
  {
    subject: 'Історія України',
    emoji: scroll,
    id: 6
  },
  {
    subject: 'Математика',
    emoji: abacus,
    id: 14
  },
  {
    subject: 'Біологія',
    emoji: dna,
    id: 18
  },
  {
    subject: 'Географія',
    emoji: geography,
    id: 19
  },
  {
    subject: 'Фізика',
    emoji: microscope,
    id: 21
  },
  {
    subject: 'Хімія',
    emoji: testTube,
    id: 22
  },
  {
    subject: 'Англійська мова',
    emoji: english,
    id: 30
  },
  {
    subject: 'Французька мова',
    emoji: france,
    id: 31
  },
  {
    subject: 'Німецька мова',
    emoji: germany,
    id: 32
  },
  // {
  //   subject: 'Іспанська мова',
  //   emoji: spain 
  // }
];

export const MyRatingLoading = () => {
  const params: any = useParams();
  const history = useHistory();
  useZNOData(+params.year)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      history.push(`/myrating/result/${params.year}/${params.subjects}/${params.scores}`);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <AppContent className='MyRatingLoading'>
      <div className='MyRatingLoadingSpinner'>
        <span>
          <span />
        </span>
        <img src={zhdun} />
        <div>
          <h3>Рівень крутості розраховується️</h3>
          <p>Але тут і без розрахунків все ясно)))</p>
        </div>
      </div>
    </AppContent>
  );
};

const ResultCardChart = ({ score, data }: {
  score: any,
  data: {[score: number]: number}
}) => {

  const canvas = React.useRef<HTMLCanvasElement>(null);

  const render = React.useCallback(() => {
    if (!canvas.current || !data)
      return;

    const div = canvas.current.parentElement;
    if (!div)
      return;

    const W = canvas.current.width = div.clientWidth * window.devicePixelRatio;
    const H = canvas.current.height = div.clientHeight * window.devicePixelRatio;
    canvas.current.style.width = div.clientWidth + 'px';
    canvas.current.style.height = div.clientHeight + 'px';

    const markerWidth = 21.54 * window.devicePixelRatio,
          markerHeight = 28 * window.devicePixelRatio;
    const p = 2 * window.devicePixelRatio,
          up = markerHeight + p + 6 * window.devicePixelRatio,
          fontSize = 10 * window.devicePixelRatio,
          down = fontSize,
          w = W - p * 2,
          h = (H - up - down) * .8 - p * 2;
    
    const ctx = canvas.current.getContext('2d');
    if (!ctx)
      return;
    
    ctx.clearRect(0, 0, W, H);

    const entries = Object.entries(data);
    entries.sort((a, b) => Number(a[0]) - Number(b[0]));

    let scoreMin = Number(entries[0][0]), scoreMax = Number(entries[0][0]),
        countMin = entries[0][1], countMax = entries[0][1];
    for (const [_score, count] of entries) {
      const scoreNum = Number(_score);
      if (scoreNum < scoreMin)
        scoreMin = scoreNum;
      if (scoreNum > scoreMax)
        scoreMax = scoreNum;
      if (count < countMin)
        countMin = count;
      if (count > countMax)
        countMax = count;
    }

    ctx.beginPath();
    let scoreLow = scoreMin, scoreHigh = scoreMax;
    for (let i = 0; i < entries.length; ++i) {
      const [_score, _count] = entries[i];
      const scoreNum = Number(_score);
      const x = (scoreNum - scoreMin) / (scoreMax - scoreMin) * w + p,
            y = (1 - (_count - countMin) / (countMax - countMin)) * h + up;
      // if (i > 0 && i < entries.length - 1) {
      //   ctx.bezierCurveTo(lx, ly, lx, ly, x, y);
      // } else {
        ctx.lineTo(x, y);
      // }

      if (scoreNum <= score && scoreNum > scoreLow)
        scoreLow = scoreNum;
      if (scoreNum >= score && scoreNum < scoreHigh)
        scoreHigh = scoreNum;
    }
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2 * window.devicePixelRatio;
    ctx.stroke();

    ctx.lineTo(W - p, H - p);
    ctx.lineTo(p, H - p);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, H, 0, H * .1);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, .56)');
    ctx.fillStyle = gradient;
    ctx.fill();

    const scoreX = (score - scoreMin) / (scoreMax - scoreMin) * w + p,
          scoreLowY = (1 - (data[scoreLow] - countMin) / (countMax - countMin)) * h + up,
          scoreHighY = (1 - (data[scoreHigh] - countMin) / (countMax - countMin)) * h + up,
          scoreY = (scoreLowY + scoreHighY) / 2;
    ctx.drawImage(markerImage, scoreX - markerWidth / 2, scoreY - markerHeight - 6 * window.devicePixelRatio, markerWidth, markerHeight);

    const scaleHeight = 4 * window.devicePixelRatio;
    ctx.beginPath();
    ctx.moveTo(p, H - p - down - scaleHeight);
    ctx.lineTo(p, H - p - down);
    ctx.lineTo(W - p, H - p - down);
    ctx.lineTo(W - p, H - p - down - scaleHeight);
    for (let i = 0; i < 4; ++i) {
      ctx.moveTo(p + (i / 4) * w, H - p - down - scaleHeight);
      ctx.lineTo(p + (i / 4) * w, H - p - down);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2 * window.devicePixelRatio;
    ctx.stroke();
    ctx.font = fontSize + 'px Mariupol';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < 5; ++i) {
      const text = scoreMin + (scoreMax - scoreMin) * (i / 4) + "";
      const width = ctx.measureText(text).width;
      let x = p + (i / 4) * w - width / 2;
      if (x - width / 2 < p)
        x = p;
      if (x + width > W - p)
        x = W - p - width;
      ctx.fillText(text, x, H - p - down + fontSize);
    }
    
  }, [ score, data ]);

  const markerImage = React.useMemo(() => {
    const image = new Image();
    image.src = marker;
    image.onload = render;
    return image;
  }, [ marker ]);

  React.useEffect(() => {
    render();

    window.addEventListener('resize', render);
    return () => {
      window.removeEventListener('resize', render);
    };
  }, [ render ]);

  return (
    <div className='MyRatingResultCardChart'>
      <canvas ref={canvas} />
    </div>
  );
}

const ResultCard = ({
  index, count,
  emoji, header, text,
  chart
}: {
  index?: number, count?: number,
  
  emoji?: any,
  header?: string,
  text?: string,

  chart?: React.ReactNode
}) => {
  return (
    <div className='MyRatingResultCard'>
      <div className='MyRatingResultCard_Top'>
        <img src={fulllogo} />
        <span className='MyRatingResultCard_Num'>
          { index }/{ count }
        </span>
      </div>
      <div className='MyRatingResultCard_Content'>
        <div>
          <img src={fire} alt="emoji fire" />
          <img src={emoji} alt="emoji" />
          <img src={fire} alt="emoji fire" />
        </div>
        <h2>{header}</h2>
        <p>{text}</p>
      </div>
      <div className='MyRatingResultCard_Chart'>
        { chart }
      </div>
    </div>
  );
}

const LastResultCard = () => {
  return (
    <div className='MyRatingResultCard LastCard'>
      <div className='MyRatingResultCard_Top'>
        <img src={fulllogoRedhead} style={{ opacity: 1 }}/>
      </div>
      <div className='MyRatingResultCard_Content'>
        <h2>Куди я зможу вступити з моїми балами?</h2>
        <Button
          onClick={() => {}}
        >
          Дізнатись
        </Button>
      </div>
    </div>
  );
}

const ShareMenu = ({ open, setOpen }: { open?: boolean,setOpen:any }) => {
  const [copied, setCopied] = React.useState(false);
  // const [download, setDownload] = React.useState(false);

  React.useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27)  {
        setOpen(false)
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  function downloadImage() {
    let mo: any = document.getElementsByName('body')
    html2canvas(mo[0]).then(function(canvas) {
      console.log("done ... ");
      document.body.appendChild(canvas);
    });
  }

  function copyToClipboard(textToCopy: any) {
    if (navigator.clipboard && window.isSecureContext) {
      setCopied(true)
      return navigator.clipboard.writeText(textToCopy);
    } else {
      let textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res: any, rej: any) => {
        setCopied(true)
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
      });
    }
  }

  return (
    <div className={cx('AppHeaderMenu ShareMenu', { open })}>
      <div>
        <div className='HeaderMenu'>
          <h2>Поділитись</h2>
          <BurgerButton value={open} setValue={setOpen}/>
        </div>
        <HeaderMenuGroup
          buttons={[
            <HeaderMenuButton
              emoji={download}
              onClick={downloadImage}
              name='Завантажити картинку'
            />,
            <HeaderMenuButton
              emoji={copy}
              onClick={(e) => {copyToClipboard(window.location.toString())}}
              name={!copied ? 'Скопіювати посилання' : 'Скопійовано!'}
            />
          ]}
        />
      </div>
    </div>
  )
}

const DonateCard = () => {
  return (
    <AppContent className='DonateCard'>
      <div className='MyRatingDonateCard'>
        <div className='MyRatingDonateCard_Content'>
          <div className='MyRatingDonateCard_Header'>
            <p>Розробники abitly теж <span>люди</span> студенти. Тож ми будемо дуже вдячні якщо ти задонатиш нам на поїсти в столовці <img src={hands} alt="hands emoji"/></p>
          </div>
          <Button
            onClick={() => {window.location.href='https://send.monobank.ua/jar/3UNSF6txsH'}}
          >
            Дати 22 гривні
          </Button>
        </div>
      </div>
    </AppContent>
  );
}

async function fetchData(year: number) {
  let data = await fetch(`/data/zno_${year}.json`);
  let res = await data.json(); 
  return res;
}

let localcache: any = null
function useZNOData(year: number) {
  const [data, setData] = React.useState(localcache);
  React.useEffect(() => {
      let unmounted = false;
      if (data == null) {
        let res = fetchData(year);
        res.then((d: any) => {
          setData(d)
          localcache = d
        })
        unmounted = !unmounted
      }
      return () => { unmounted = true };
  }, [ year ]);
  return data;
}

export const MyRatingResult = () => {
  const params: any = useParams();
  const subjects: string[] = [];
  let scores: number[] = []
  
  const [open, openDelayed, setOpen] = useAnimated(false);

  let marks = useZNOData(+params.year)

  function filterSubjects() {
    let index = params.subjects.match(/\d+/g);
    for (let i = 0; i < index.length; i++) {
      for (let j = 0; j < infoSubjects.length; j++) {
        if (j == +index[i]) {
          subjects.push(infoSubjects[j].subject)
        }
      }
    }
    return subjects
  }

  function filterScores() {
    for(let i = 0; i < params.scores.length; i++) {
      scores = params.scores.split(',')
    }
  }

  filterSubjects()
  filterScores()

  function myZNORating(subjectId: any, mark: any) {
    let subject: any = marks[subjectId];
    let allPupils = 0, worsePupils = 0;
    for (const statmark in subject.stats) {
      allPupils += subject.stats[statmark];
      if (Number(statmark) < mark) {
        worsePupils += subject.stats[statmark];
      }
    }
    return (worsePupils / allPupils * 100).toFixed(2) + '%';
  }

  function findSubjectId(subject: string) {
    for (let i = 0; i < infoSubjects.length; i++) {
      if (infoSubjects[i].subject === subject) {
        return infoSubjects[i].id
      }
    }
  }

  function findEmoji(subject: string) {
    let j = infoSubjects.find(i => {
      if (i.subject === subject) {
        return i;
      };
    });
    return j?.emoji
  }
  return (
    <div className='MyRatingResult'>
      <DonateCard/>
      <Slider
        className='MyRatingResult_Cards'
        dots={true}
        slidesToShow={1.1}
        slidesToScroll={1}
        arrows={false}
        infinite={false}
      >
        { subjects?.map((subject, i) => 
          <ResultCard
            key={i}

            index={i+1}
            count={subjects.length}

            emoji={findEmoji(subject)}
            header={`Твій бал ЗНО з ${subject} краще ніж у ${marks ? myZNORating(findSubjectId(subject), +scores[i]) : ''} абітурієнтів`}
            text={`які здавали цей предмет в ${+params.year} році`}
  
            chart={
              <ResultCardChart
                score={+scores[i]}
                data={UkrBallData}
              />
            }
          />
        )}
        <LastResultCard/> 
      </Slider>
      <AppContent className='MyRatingResult_Bottom'>
        <Button
          onClick={() => {setOpen(true)}}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <img src={share} style={{ marginRight: 12 }} />
            Поділитись
          </span>
        </Button>
      </AppContent>
      { (open || openDelayed) && 
        <ShareMenu open={open} setOpen={setOpen}/>
      }
    </div>
  );
}
