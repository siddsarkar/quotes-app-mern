import * as actionTypes from "../actions/actionTypes";

const initialState = {
  articles: [],
  myArticles: [],
  article: {},
  pages: 0,
  tags: [
    {
      id: 6,
      name: "javascript",
      hotness_score: 10070572,
      supported: true,
      short_summary:
        "\u003cp\u003eOnce relegated to the browser as one of the 3 core technologies of the web, JavaScript can now be found almost anywhere you find code. \u003c/p\u003e\u003cp\u003eJavaScript developers move fast and push software development forward; they can be as opinionated as the frameworks they use, so let's keep it clean here and make it a place to learn from each other!\u003c/p\u003e",
      rules_html:
        "\u003cp\u003eClient-side, server-side, it doesn't matter. This tag should be used for anything \u003cstrong\u003e\u003cem\u003eJavaScript\u003c/em\u003e\u003c/strong\u003e focused. If the topic is about a JavaScript \u003cem\u003eframework\u003c/em\u003e or \u003cem\u003elibrary\u003c/em\u003e, just remember to include the framework's tag as well.\u003c/p\u003e\n",
      last_indexed_at: "2020-10-09T00:25:03.694Z",
    },
    {
      id: 8,
      name: "webdev",
      hotness_score: 5757856,
      supported: true,
      short_summary: "",
      rules_html: null,
      last_indexed_at: "2020-10-09T00:25:04.224Z",
    },
    {
      id: 555,
      name: "beginners",
      hotness_score: 2738289,
      supported: true,
      short_summary:
        '"A journey of a thousand miles begins with a single step." -Chinese Proverb',
      rules_html:
        '\u003cp\u003e\u003ca href="https://dev.to/codemouse92/updated-beginner-tag-guidelines-1m2e"\u003eUPDATED AUGUST 2, 2019\u003c/a\u003e\u003c/p\u003e\n\n\u003cp\u003eThis tag is dedicated to beginners to programming, development, networking, or to a particular language. Everything should be geared towards that!\u003c/p\u003e\n\u003ch2\u003e\n  \u003ca href="#for-questions" class="anchor"\u003e\n  \u003c/a\u003e\n  For Questions...\n\u003c/h2\u003e\n\n\u003cp\u003eConsider using this tag along with #help, if... \u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003e\u003cp\u003eYou are new to a language, or to programming in general,\u003c/p\u003e\u003c/li\u003e\n\u003cli\u003e\u003cp\u003eYou want an explanation with \u003cstrong\u003eNO\u003c/strong\u003e prerequisite knowledge required.\u003c/p\u003e\u003c/li\u003e\n\u003cli\u003e\u003cp\u003eYou want insight from more experienced developers.\u003c/p\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003ePlease do \u003cem\u003enot\u003c/em\u003e use this tag if you are merely new to a tool, library, or framework.\u003c/p\u003e\n\n\u003cp\u003eSee also, \u003ca href="https://dev.to/t/explainlikeimfive"\u003e#explainlikeimfive\u003c/a\u003e\u003c/p\u003e\n\u003ch2\u003e\n  \u003ca href="#for-articles" class="anchor"\u003e\n  \u003c/a\u003e\n  For Articles...\n\u003c/h2\u003e\n\n\u003cul\u003e\n\u003cli\u003e\u003cp\u003ePosts should be \u003cstrong\u003especifically geared towards true beginners\u003c/strong\u003e (experience level 0-2 out of 10).\u003c/p\u003e\u003c/li\u003e\n\u003cli\u003e\u003cp\u003ePosts should require \u003cstrong\u003eNO\u003c/strong\u003e prerequisite knowledge, except perhaps general (language-agnostic) essentials of programming.\u003c/p\u003e\u003c/li\u003e\n\u003cli\u003e\u003cp\u003ePosts should \u003cem\u003eNOT\u003c/em\u003e merely be for beginners to a tool, library, or framework. \u003c/p\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\n\u003cp\u003eIf your article does not meet these qualifications, please select a different tag.\u003c/p\u003e\n\u003ch2\u003e\n  \u003ca href="#promotional-rules" class="anchor"\u003e\n  \u003c/a\u003e\n  Promotional Rules\n\u003c/h2\u003e\n\n\u003cul\u003e\n\u003cli\u003e\u003cp\u003ePosts \u003cstrong\u003eshould NOT\u003c/strong\u003e primarily promote an external work. This is what \u003ca href="https://dev.to/listings"\u003eListings\u003c/a\u003e is for.\u003c/p\u003e\u003c/li\u003e\n\u003cli\u003e\u003cp\u003eOtherwise accepable posts \u003cstrong\u003eMAY\u003c/strong\u003e include a brief (1-2 sentence) plug for another resource at the bottom.\u003c/p\u003e\u003c/li\u003e\n\u003cli\u003e\n\u003cp\u003eResource lists \u003cstrong\u003eARE\u003c/strong\u003e acceptable if they follow these rules:\u003c/p\u003e\n\n\u003cul\u003e\n\u003cli\u003eInclude at least 3 distinct authors/creators.\u003c/li\u003e\n\u003cli\u003eClearly indicate which resources are FREE, which require PII, and which cost money.\u003c/li\u003e\n\u003cli\u003eDo not use personal affiliate links to monetize.\u003c/li\u003e\n\u003cli\u003eIndicate at the top that the article contains promotional links.\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/li\u003e\n\u003c/ul\u003e\n',
      last_indexed_at: "2020-10-09T00:25:16.182Z",
    },
    {
      id: 125,
      name: "react",
      hotness_score: 1376254,
      supported: true,
      short_summary:
        "Official tag for Facebook's React JavaScript library for building user interfaces",
      rules_html:
        '\u003cp\u003e1️⃣ Post Facebook\'s React ⚛ related posts/questions/discussion topics here~\u003c/p\u003e\n\n\u003cp\u003e2️⃣ There are no silly posts or questions as we all learn from each other👩‍🎓👨‍🎓\u003c/p\u003e\n\n\u003cp\u003e3️⃣ Adhere to dev.to 👩‍💻👨‍💻\u003ca href="https://dev.to/code-of-conduct"\u003eCode of Conduct\u003c/a\u003e\u003c/p\u003e\n',
      last_indexed_at: "2020-10-09T00:25:09.918Z",
    },
    {
      id: 297,
      name: "tutorial",
      hotness_score: 1209102,
      supported: true,
      short_summary:
        "Tutorial is a general purpose tag. We welcome all types of tutorial - code related or not! \r\n\r\nIt's all about learning, and using tutorials to teach others!",
      rules_html:
        "\u003cp\u003eTutorials should teach by example. \u003c/p\u003e\n\n\u003cp\u003eThis can include an interactive component or steps the reader can follow to understand.\u003c/p\u003e\n",
      last_indexed_at: "2020-10-09T00:25:13.248Z",
    },
    {
      id: 25,
      name: "python",
      hotness_score: 888326,
      supported: true,
      short_summary: "import antigravity",
      rules_html:
        "\u003cp\u003eArticles and discussions should be directly related to the Python programming language.\u003c/p\u003e\n\n\u003cp\u003eQuestions are encouraged! (See the #help tag)\u003c/p\u003e\n",
      last_indexed_at: "2020-10-09T00:25:06.241Z",
    },
    {
      id: 715,
      name: "discuss",
      hotness_score: 672662,
      supported: true,
      short_summary: "What color should the bike shed be?",
      rules_html:
        "\u003cp\u003eThese posts should be questions designed to elicit community responses.\u003c/p\u003e\n\n\u003cp\u003eIf it is more of a blog post, than a question it should not have this tag.\u003c/p\u003e\n\n\u003cp\u003eIf you would like to offer your own response to get the conversation going, it is best to leave it as a comment on the post, rather than the body of the post.\u003c/p\u003e\n",
      last_indexed_at: "2020-10-09T00:25:17.603Z",
    },
    {
      id: 23,
      name: "css",
      hotness_score: 544927,
      supported: true,
      short_summary:
        "Cascading Style Sheets (CSS) is a simple language for adding style (e.g., fonts, colors, spacing) to HTML documents. It describes how HTML elements should be displayed.",
      rules_html: null,
      last_indexed_at: "2020-10-09T00:25:05.772Z",
    },
    {
      id: 112,
      name: "productivity",
      hotness_score: 473724,
      supported: true,
      short_summary:
        "Productivity includes tips on how to use tools and software, process optimization, useful references, experience, and mindstate optimization.",
      rules_html:
        "\u003cp\u003ePlease check if your article contains information or discussion bases about productivity.\u003c/p\u003e\n\n\u003cp\u003eFrom posts with the tag #productivity we expect tips on how to use tools and software, process optimization, useful references, experience, and mindstate optimization.\u003cbr\u003e\nProductivity is a very broad term with many aspects and topics. From the color design of the office to personal rituals, anything can contribute to increase / optimize your own productivity or that of a team.\u003c/p\u003e\n",
      last_indexed_at: "2020-10-09T00:25:09.085Z",
    },
    {
      id: 316,
      name: "android",
      hotness_score: 443562,
      supported: true,
      short_summary: "",
      rules_html: null,
      last_indexed_at: "2020-10-09T00:25:13.667Z",
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GOT_ALL_ARTICLES:
      return {
        ...state,
        articles: [...state.articles, ...action.articles],
        pages: action.pages,
      };
    case actionTypes.CLEAR_ARTICLES:
      return {
        ...state,
        articles: [],
        pages: 0,
      };
    case actionTypes.GOT_MY_ARTICLES:
      return {
        ...state,
        myArticles: action.myArticles,
      };
    case actionTypes.GOT_SINGLE_ARTICLE:
      return {
        ...state,
        article: action.article,
      };
    default:
      return state;
  }
};

export default reducer;
