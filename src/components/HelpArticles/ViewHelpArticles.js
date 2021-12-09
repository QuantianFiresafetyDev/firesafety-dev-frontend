import React , { useEffect , useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL_BASE } from 'utils/constant';
import SecondaryNav from "../Layouts/SecondaryNav";
import { Link } from "react-router-dom";
import { PostAddTwoTone } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import parse from "html-react-parser"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


function ViewHelpArticles() {
  const [data, setdata] = useState([]);
  // const history = useHistory();
  const token = useSelector((state)=> state.user.token)
	const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log(token)

  useEffect(() => {
    async function fetchArticleData(){
      await fetch(`${API_URL_BASE}/articles/`, {
        headers: {
          // 'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json()).then(data => setdata(data.body))
    }
    fetchArticleData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

	console.log("debug",data)
  
  return (
    <>
      <SecondaryNav />
      <div>
        <div className="d-flex justify-content-between">
          <div className="table_top">Articles</div>
          <div className="audit_adding_sign">
            {' '}
            <Link className="link_col" to="/addArticles">
              <PostAddTwoTone />
            </Link>
          </div>
          <div className="filter_logo">
            {' '}
            <p className="fa fa-filter"></p>
          </div>
          <div className="three_dots">
            {' '}
            <p className="fa fa-ellipsis-v"></p>
          </div>
        </div>
        <div className="container mt-5">
          {data &&
            data.map(article => (
              <Accordion
                expanded={expanded === article._id}
                onChange={handleChange(article._id)}
                key={article._id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${article._id}bh-content`}
                  id={`${article._id}bh-header`}>
                  <Typography className={classes.heading}>
                    {article.title}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    {article.subject}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  {article.description.map(each => {
                    return <Typography>{parse(each)}</Typography>;
                  })}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      </div>
    </>
  );
}

export default ViewHelpArticles;
