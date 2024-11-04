import { ReactComponent as CloudUploadIcon } from "@trimble-oss/modus-icons/dist/modus-solid/svg/cloud-upload.svg";
import {
  Button,
  FileUploadDropZone,
  Nav,
  Navbar,
  OverlayTrigger as OriginalOverlayTrigger,
  ProgressBar,
  Tab,
  Tabs,
  Tooltip,
} from "@trimbleinc/modus-react-bootstrap";
import "@trimbleinc/modus-react-bootstrap/css/dist/modus-react-bootstrap.min.css";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./App.css";

// Custom OverlayTrigger component using default parameters
const OverlayTrigger = ({ placement = "bottom", overlay, children }) => (
  <OriginalOverlayTrigger placement={placement} overlay={overlay}>
    {children}
  </OriginalOverlayTrigger>
);

function App() {
  const [activeTab, setActiveTab] = useState("Image-to-Web");
  const [filesUploaded, setFilesUploaded] = useState(null);
  const [inputImageSrc, setInputImageSrc] = useState(null); // New state for uploaded image URL
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [showCode, setShowCode] = useState(true);
  const [outputHTMLCode, setOutputHTMLCode] = useState("");
  const [outputScriptCode, setOutputScriptCode] = useState("");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [outputImageSrc, setOutputImageSrc] = useState("");

  const handleTabSelect = (key) => setActiveTab(key);

  useEffect(() => {
    // Set the path of the generated image in the local folder
    const generatedImagePath =
      "C:UsersgokulakDocumentsHack2024image-to-codesrcsk.png"; // Replace with the actual path
    setOutputImageSrc(generatedImagePath);
  }, []);
  const handleGenerate = () => {
    if (filesUploaded) {
      const htmlCode = `<modus-navbar id="working" show-apps-menu show-help show-main-menu>
  <div slot="main" style="height:300px;">Render your own main menu.</div>
  <div slot="addMenu">Render your own add menu.</div>
  <div slot="notificationMenu">Render your own notification menu.</div>
  <div slot="profileMenu">Render your own profile menu content.</div>
</modus-navbar>


<div style="position: absolute; top: 100px; width: 1200px; height: 600px;">
  <modus-text-input label="Email" style="position: absolute; top: 150px; left: 100px; width: 400px; height: 50px;"></modus-text-input>
  <modus-text-input label="Password" type="password" style="position: absolute; top: 250px; left: 100px; width: 400px; height: 50px;"></modus-text-input>
  <modus-button style="position: absolute; top: 350px; left: 100px; width: 100px; height: 50px;" color="primary">Login</modus-button>
</div>


`;
      const scriptCode = ` const element: any = document.querySelector('modus-navbar');
element.apps = [
  {
    description: 'The One Trimble Design System',
    logoUrl: 'https://modus.trimble.com/favicon.svg',
    name: 'Trimble Modus',
    url: 'https://modus.trimble.com/',
  },
];
element.logoOptions = {
  primary: {
    url: 'https://modus.trimble.com/img/trimble-logo.svg',
    height: 24,
  },
  secondary: { url: 'https://modus.trimble.com/favicon.svg', height: 24 },
};
element.dropdownOptions = {
  ariaLabel: 'Project dropdown',
  defaultValue: '2',
  items: [
    { text: 'Project 1', value: '1' },
    { text: 'Project 2', value: '2' },
    { text: 'Project 3', value: '3' },
  ],
};
element.profileMenuOptions = {
  avatarUrl: '...',
  email: 'modus_user@trimble.com',
  initials: 'MU',
  signOutText: 'Sign out',
  username: 'Modus User',
  links: [
    { id: 'link1', display: 'Link 1', icon: 'moon' },
    { id: 'link2', display: 'Link 2', icon: 'sun' },
  ],
};


`;
      setGeneratedCode(htmlCode);
      setOutputHTMLCode(htmlCode);
      setOutputScriptCode(scriptCode);
      setIsLoading(true);
      setOutputScriptCode(scriptCode);

      // Simulate the loading progress
      const loadingInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
              setIsLoading(false);
              setIsGenerated(true);
            }, 1000); // Small delay to ensure progress reaches 100%
          }
          return prevProgress + 10;
        });
      }, 3000);
    }
  };

  const onCopyCodeClicked = () => {
    navigator.clipboard.writeText(outputHTMLCode);
  };

  const onCopyScriptClicked = () => {
    navigator.clipboard.writeText(outputScriptCode);
  };

  const onRenderClicked = () => {
    setShowCode(false);
  };

  const onCodeClicked = () => {
    setShowCode(true);
  };

  const onBackClicked = () => {
    setIsGenerated(false);
  };

  const handleBack = () => {
    setIsGenerated(false);
    setFilesUploaded(null);
    setInputImageSrc(null); // Reset uploaded image on back
    setGeneratedCode("");
    setProgress(0);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        id="example-navbar"
        className="border navbar-blue"
      >
        <Navbar.Brand className="mr-auto ml-2" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 444.7 100"
            width="107"
            height="25"
            className="img-fluid d-none d-sm-block"
            alt="home"
            fill="white"
          >
            <path
              d="M115.85 87.13v-62H93V11.21h62.57v14h-23v62zM141.9 87.13V32.74h16.52v8.84h.1c3-4.62 8.21-10.26 18.47-10.26h.51V46c-.61-.11-3.49-.31-4.51-.31a18.27 18.27 0 00-14.57 7.49v34zM182.72 25V11.72h16.62V25zm.11 62.17V32.44h16.41V87.13zM205.7 87.13V32.44h16.51v8.62c3.29-4.31 9.34-9.74 18-9.74 9.13 0 13.44 3.79 15 9.74 3.28-4.2 9.44-9.74 18-9.74 11.08 0 16 7 16 16.72V87.13h-16.41V52.45c0-4.92-1.13-7.49-5.95-7.49-4.1 0-7.39 2.26-11 5.44V87.13h-16.34V52.45c0-4.92-1.13-7.49-6-7.49-4.1 0-7.38 2.26-11.08 5.44V87.13zM312 80.66v6.47H295.45V11.21H312V40.86c3.59-5 8.72-9.54 16.82-9.54 12.42 0 21 9.54 21 28.4S341.11 88 328.59 88c-7.32 0-12.07-2.72-16.61-7.34zm21.34-20.82c0-9.13-3.18-14.88-10.57-14.88-4.21 0-8 2.57-10.77 5.34V70.51c3.59 3.38 6.56 5 11 5 7.82 0 10.31-5.53 10.31-15.34zM354.94 87.13V11.21h16.41V87.13zM376.47 59.84c0-21.24 16.21-28.52 27.49-28.52S429.1 37 429.1 61.79v2.46H392.88c.83 9 5.85 12.51 12.73 12.51a25.16 25.16 0 0016.21-6.56l6.36 9.85c-6.36 5.44-14.26 8.21-23.8 8.21-13.36 0-26.47-7.26-26.47-28.21zm37.86-5.34c-.82-7.69-4.31-11.39-10.47-11.39-5.13 0-9.54 3.39-10.77 11.39zM432.22 81a6.19 6.19 0 016.26-6.26 6.26 6.26 0 110 12.52 6.19 6.19 0 01-6.26-6.26zm11.38 0a5.14 5.14 0 10-5.12 5.23 5.12 5.12 0 005.12-5.23zm-7.55-3.56h2.56c1.62 0 2.56.7 2.56 2.1a1.84 1.84 0 01-1.34 1.94l1.48 2.81h-1.43l-1.38-2.62h
-1.08v2.62h-1.37zm2.48 3.18c.84 0 1.3-.27 1.3-1s-.46-1-1.33-1h-1.08v2zM6.19 76.41V1e2L26.71 88.16A39.1 39.1 0 016.19 76.41zM26.56 11.74L6.19 0V23.45A39.33 39.33 0 0126.56 11.74zM92.8 50L72.29 38.16a39.27 39.27 0 01-.06 23.72zM19.7 17.92c2.94-.65 9.05 0 12.28.89a18.68 18.68 0 0110.37-3.45A41.12 41.12 0 0019.7 17.92zM58.79 60.84a53.07 53.07 0 00-3.21-13.13c-7 3.18-15.72 1.13-21.53-3.9A95.93 95.93 0 0022.62 58.32C32.47 66.35 48.67 68.46 58.79 60.84zM17.23 59.09C8.55 50.19 5.52 37.22 8.3 27.25a35 35 0 002 47.47 63.4 63.4 0 006.93-15.63zM54 43.94a47.18 47.18 0 00-7-10.78A80.73 80.73 0 0037 40.93c5.26 4.37 12.14 5.23 17 3.01zM47.47 27.72a36.33 36.33 0 017.62-4.23c-5.56-5.62-14.5-5.47-18.39-3a37.17 37.17 0 0010.77 7.23zM20.4 62c-4.32 7.47-5.9 13-6.48 15.87A35 35 0 0057.1 77a30 30 0 002-11.33C47.14 72.79 30.66 70.07 20.4 62zM57.4 41.45c3.83-4 3.06-10.84.15-14.78a29.6 29.6 0 00-7.13 4.18 52.73 52.73 0 006.98 10.6zM64 32.85a14.1 14.1 0 01-4.84 12.59A57.37 57.37 0 0162.49 57.2C67.74 50.38 67.58 40.64 64 32.85zM34.16 37.9a83.13 83.13 0 0110.82-6.59C29.92 27.89 30.92 33.53 34.16 37.9zM63.12 62.69a49.42 49.42 0 01-.43 8.88A35.37 35.37 0 0170 47.07 26.82 26.82 0 0163.12 62.69zM29.1 22.28a28.42 28.42 0 00-13.9.09c-6.89 9.77-3.69 24.08 4.33 33A100.8 100.8 0 0131.18 40.79c-4.08-5.07-5.7-12.9-2.08-18.51z"
            />
          </svg>
        </Navbar.Brand>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <OverlayTrigger
              key="account"
              placement="bottom"
              overlay={
                <Tooltip id="accounttooltip">
                  <div className="text-left">
                    MyTrimble
                    <br />
                    Guest
                    <br />
                    guest_acct@trimble.com
                  </div>
                </Tooltip>
              }
            >
              <Button variant="icon-only" id="acntbtn" size="lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="mi-solid mi-person-account"
                  viewBox="0 0 26 26"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 4c2.07 0 3.75 1.68 3.75 3.75S14.07 13.5 12 13.5s-3.75-1.68-3.75-3.75S9.93 6 12 6m0 14c-2.84 0-5.34-1.5-6.76-3.74.13-.07.27-.14.43-.21 1.22-.56 3.47-1.37 6.33-1.37 2.87 0 5.12.81 6.33 1.37.16.07.3.15.43.22A7.99 7.99 0 0 1 12 20" />
                </svg>
              </Button>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      

      <div className="App">
        
        <div className="tab-container">
          <Tabs
            id="modus-tabs"
            activeKey={activeTab}
            onSelect={handleTabSelect}
          >
            {/* Image to Code Tab */}
            <Tab eventKey="Image-to-Web" title="Image-to-Web">
              {!isGenerated ? (
                <div id="Image-to-Web" className="tab-pane">
                  <div className="file-dropzone-container">
                    <FileUploadDropZone
                      className="file-dropzone"
                      id="file-dropzone"
                      maxFileCount={1}
                      maxTotalFileSizeBytes={5000000000}
                      accept="image/*"
                      onFiles={(files, err) => {
                        if (!err && files.length > 0) {
                          setFilesUploaded(files);
                          const imageUrl = URL.createObjectURL(files[0]);
                          setInputImageSrc(imageUrl);
                        } else {
                          setFilesUploaded(null);
                          setInputImageSrc(null);
                        }
                      }}
                      uploadIcon={
                        <CloudUploadIcon
                          style={{
                            width: "30px",
                            height: "30px",
                            fill: "grey",
                          }}
                        />
                      }
                    />
                    {filesUploaded && (
                      <div className="files-uploaded">
                        <h4 className="mt-5">Files uploaded:</h4>
                        <ul className="list-group list-group-borderless">
                          {Array.from(filesUploaded).map((file, index) => (
                            <li
                              className="list-group-item list-item-left-control"
                              key={index}
                            >
                              <i className="modus-icons">check_circle</i>
                              <span>{file.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <Button className="generate-button" onClick={handleGenerate}>
                    Generate Code
                  </Button>
                  {isLoading && (
                    <div>
                      <ProgressBar
                        style={{ marginTop: "20px", width: "100%" }}
                        now={progress}
                      />
                      <div className="text-left text-dark"></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mainContainer">
                  <div>
                    <h2 className="title" style={{ fontWeight: "bold" }}>
                      Input Image
                    </h2>
                    <img
                      src={inputImageSrc || "URL_OF_DEFAULT_IMAGE"}
                      alt="Input"
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        border: "2px solid #1f1d1d",
                        padding: "10px",
                      }}
                    />
                  </div>
                  <div className="row rootContainer">
                    <div
                      className="col-12 outputRenderer"
                      dangerouslySetInnerHTML={{ __html: outputHTMLCode }}
                      hidden={showCode}
                    ></div>
                    <div className="col-6 codeContainer" hidden={!showCode}>
                      <h2>HTML code</h2>
                      <div className="codeContainerHeader">
                        <Button onClick={onCopyCodeClicked}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="mi-outline mi-file-copy"
                            viewBox="0 0 24 24"
                          >
                            <path d="M15 20H6V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h9c.55 0 1-.45 1-1s-.45-1-1-1Zm4.71-13.29L15.3 2.3a.99.99 0 0 0-.71-.29H9.5c-1.1 0-2 .9-2 2v12.5c0 1.1.9 2 2 2H18c1.1 0 2-.9 2-2v-9.1c0-.27-.11-.52-.29-.71ZM15 5l2 2s-2-.02-2 0V5Zm3 11.5H9.5V4H13v4c0 .55.45 1 1 1h4v7.5Z" />
                          </svg>
                          Copy Code
                        </Button>
                      </div>
                      <div className="codeContainerBodyRoot">
                        <code>
                          <div className="codeContainerBodyContent">
                            <SyntaxHighlighter language="html" style={dracula}>
                              {outputHTMLCode}
                            </SyntaxHighlighter>
                          </div>
                        </code>
                      </div>
                    </div>
                    <div className="col-6 codeContainer" hidden={!showCode}>
                      <h2>Java script</h2>
                      <div className="codeContainerHeader">
                        <Button onClick={onCopyScriptClicked}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="mi-outline mi-file-copy"
                            viewBox="0 0 24 24"
                          >
                            <path d="M15 20H6V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h9c.55 0 1-.45 1-1s-.45-1-1-1Zm4.71-13.29L15.3 2.3a.99.99 0 0 0-.71-.29H9.5c-1.1 0-2 .9-2 2v12.5c0 1.1.9 2 2 2H18c1.1 0 2-.9 2-2v-9.1c0-.27-.11-.52-.29-.71ZM15 5l2 2s-2-.02-2 0V5Zm3 11.5H9.5V4H13v4c0 .55.45 1 1 1h4v7.5Z" />
                          </svg>
                          Copy Script
                        </Button>
                      </div>
                      <div className="codeContainerBodyRoot">
                        <code>
                          <div className="codeContainerBodyContent">
                            <SyntaxHighlighter
                              language="javascript"
                              style={dracula}
                            >
                              {outputScriptCode}
                            </SyntaxHighlighter>
                          </div>
                        </code>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "100px",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "end",
                    }}
                  >
                    <Button hidden={!showCode}>Render</Button>
                    <Button
                      onClick={handleBack}
                      style={{ marginRight: "120px", marginLeft: "20px" }}
                    >
                      Back
                    </Button>
                    <Button hidden={showCode} onClick={onCodeClicked}>
                      Code
                    </Button>
                  </div>
                </div>
              )}
            </Tab>

            <Tab eventKey="image-to-App" title="Image to App">
              <div id="image-to-App" className="tab-pane">
                <div className="file-dropzone-container">
                  {!isGenerated ? (
                    <div id="image-to-app" className="tab-pane">
                      <div className="file-dropzone-container">
                        <FileUploadDropZone
                          className="file-dropzone"
                          id="file-dropzone"
                          maxFileCount={1}
                          maxTotalFileSizeBytes={5000000000}
                          accept="image/*"
                          onFiles={(files, err) => {
                            if (!err && files.length > 0) {
                              setFilesUploaded(files);
                              const imageUrl = URL.createObjectURL(files[0]);
                              setInputImageSrc(imageUrl);
                            } else {
                              setFilesUploaded(null);
                              setInputImageSrc(null);
                            }
                          }}
                          uploadIcon={
                            <CloudUploadIcon
                              style={{
                                width: "30px",
                                height: "30px",
                                fill: "grey",
                              }}
                            />
                          }
                        />
                        {filesUploaded && (
                          <div className="files-uploaded">
                            <h4 className="mt-5">Files uploaded:</h4>
                            <ul className="list-group list-group-borderless">
                              {Array.from(filesUploaded).map((file, index) => (
                                <li
                                  className="list-group-item list-item-left-control"
                                  key={index}
                                >
                                  <i className="modus-icons">check_circle</i>
                                  <span>{file.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <Button
                        className="generate-button"
                        onClick={handleGenerate}
                      >
                        Generate App
                      </Button>
                      {isLoading && (
                        <div>
                          <ProgressBar
                            style={{ marginTop: "20px", width: "100%" }}
                            now={progress}
                          />
                          <div className="text-left text-dark"></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="output-pane" style={{ display: "flex" }}>
                      {/* Sidebar for Input Image */}
                      <div>
                        <h2 className="title" style={{ fontWeight: "bold" }}>
                          Input Image
                        </h2>
                        <img
                          src={inputImageSrc || "URL_OF_DEFAULT_IMAGE"}
                          alt="Input"
                          style={{
                            width: "100%",
                            marginTop: "10px",
                            border: "2px solid #1f1d1d",
                            padding: "10px",
                          }}
                        />
                      </div>

                      {/* Main content for code containers */}
                      <div className="app-codes" style={{ width: "80%" }}>
                        {/* Code Container 1 */}
                        <h2> XAML code</h2>
                        <div
                          className="codeContainer"
                          style={{ marginBottom: "10px" }}
                        >
                          <div className="codeContainerHeader">
                            <Button onClick={onCopyScriptClicked}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="mi-outline mi-file-copy"
                                viewBox="0 0 24 24"
                              >
                                <path d="M15 20H6V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h9c.55 0 1-.45 1-1s-.45-1-1-1Zm4.71-13.29L15.3 2.3a.99.99 0 0 0-.71-.29H9.5c-1.1 0-2 .9-2 2v12.5c0 1.1.9 2 2 2H18c1.1 0 2-.9 2-2v-9.1c0-.27-.11-.52-.29-.71ZM15 5l2 2s-2-.02-2 0V5Zm3 11.5H9.5V4H13v4c0 .55.45 1 1 1h4v7.5Z" />
                              </svg>
                              Copy
                            </Button>
                          </div>
                          <div className="codeContainerBodyRoot">
                            <code>
                              <div className="codeContainerBodyContent">
                                <SyntaxHighlighter
                                  language="xml"
                                  style={dracula}
                                >
                                  {`<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             xmlns:modus="http://modus.trimble.com/components"
             x:Class="DemoApp.Views.NewPage"
             Title="NewPage">
  <ContentPage.Content>
    <StackLayout>
      <!-- Top Navigation Bar -->
      <Grid BackgroundColor="White" Padding="10">
        <Grid.ColumnDefinitions>
          <ColumnDefinition Width="Auto" />
          <ColumnDefinition Width="*" />
          <ColumnDefinition Width="Auto" />
        </Grid.ColumnDefinitions>
        <Image Source="hamburger_menu.png" Grid.Column="0" VerticalOptions="Center" />
        <StackLayout Grid.Column="1" HorizontalOptions="Center" VerticalOptions="Center">
          <Label Text="Karur Vysya Bank" FontSize="Medium" FontAttributes="Bold" HorizontalOptions="Center" />
          <Label Text="Smart way to bank" FontSize="Small" HorizontalOptions="Center" />
        </StackLayout>
        <Image Source="notification_icon.png" Grid.Column="2" VerticalOptions="Center" />
      </Grid>

      <!-- Linked Banks Section -->
      <StackLayout Padding="10">
        <Grid>
          <Grid.ColumnDefinitions>
            <ColumnDefinition Width="*" />
            <ColumnDefinition Width="Auto" />
          </Grid.ColumnDefinitions>
          <Label Text="LINKED BANKS" FontSize="Medium" FontAttributes="Bold" VerticalOptions="Center" />
          <modus:TMButton Text="Add Bank" Grid.Column="1" />
        </Grid>
      </StackLayout>

      <!-- Quick Transfer Section -->
      <StackLayout Padding="10">
        <Grid>
          <Grid.ColumnDefinitions>
            <ColumnDefinition Width="*" />
            <ColumnDefinition Width="Auto" />
          </Grid.ColumnDefinitions>
          <Label Text="QUICK TRANSFER" FontSize="Medium" FontAttributes="Bold" VerticalOptions="Center" />
          <modus:TMButton Text="Add Beneficiary" Grid.Column="1" />
        </Grid>

        <!-- Transfer Options -->
        <modus:TMRadioButtonGroup x:Name="TransferOptions" SelectedIndex="0" Orientation="Vertical">
          <modus:TMRadioButton Text="VPA (Virtual Payment Address)" IsSelected="True" />
          <modus:TMRadioButton Text="IFSC (Indian Financial System Code)" />
          <modus:TMRadioButton Text="MMID (Mobile Money Identifier)" />
          <modus:TMRadioButton Text="AADHAAR" />
        </modus:TMRadioButtonGroup>

        <!-- Input Fields -->
        <modus:TMInput TitleText="Virtual ID" Placeholder="Virtual ID" />
        <modus:TMInput TitleText="Amount" Placeholder="Amount" />

        <!-- Action Buttons -->
        <Grid Padding="10">
          <Grid.ColumnDefinitions>
            <ColumnDefinition Width="*" />
            <ColumnDefinition Width="*" />
            <ColumnDefinition Width="*" />
          </Grid.ColumnDefinitions>
          <modus:TMButton Text="Request Now" Grid.Column="0" />
          <modus:TMButton Text="Scan and Pay" Grid.Column="1" />
          <modus:TMButton Text="Send Now" Grid.Column="2" />
        </Grid>
      </StackLayout>
    </StackLayout>
  </ContentPage.Content>
</ContentPage>
`}
                                </SyntaxHighlighter>
                              </div>
                            </code>
                          </div>
                        </div>

                        {/* Code Container 2 */}
                        <h2> code-behind</h2>
                        <div
                          className="codeContainer"
                          style={{ marginBottom: "10px" }}
                        >
                          <div className="codeContainerHeader">
                            <Button onClick={onCopyScriptClicked}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="mi-outline mi-file-copy"
                                viewBox="0 0 24 24"
                              >
                                <path d="M15 20H6V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h9c.55 0 1-.45 1-1s-.45-1-1-1Zm4.71-13.29L15.3 2.3a.99.99 0 0 0-.71-.29H9.5c-1.1 0-2 .9-2 2v12.5c0 1.1.9 2 2 2H18c1.1 0 2-.9 2-2v-9.1c0-.27-.11-.52-.29-.71ZM15 5l2 2s-2-.02-2 0V5Zm3 11.5H9.5V4H13v4c0 .55.45 1 1 1h4v7.5Z" />
                              </svg>
                              Copy
                            </Button>
                          </div>
                          <div className="codeContainerBodyRoot">
                            <code>
                              <div className="codeContainerBodyContent">
                                <SyntaxHighlighter
                                  language="csharp"
                                  style={dracula}
                                >
                                  {`namespace DemoApp.Views;
using DemoApp.ViewModels;

public partial class NewPage : ContentPage
{
    private NewPageViewModel _viewModel;
    public NewPage()
	{
        _viewModel = new NewPageViewModel();
        InitializeComponent();
	}
}
`}
                                </SyntaxHighlighter>
                              </div>
                            </code>
                          </div>
                        </div>
                        {/* Code Container 3  */}
                        <h2> ViewModel</h2>
                        <div
                          className="codeContainer"
                          style={{ marginBottom: "10px" }}
                        >
                          <div className="codeContainerHeader">
                            <Button onClick={onCopyScriptClicked}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="mi-outline mi-file-copy"
                                viewBox="0 0 24 24"
                              >
                                <path d="M15 20H6V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h9c.55 0 1-.45 1-1s-.45-1-1-1Zm4.71-13.29L15.3 2.3a.99.99 0 0 0-.71-.29H9.5c-1.1 0-2 .9-2 2v12.5c0 1.1.9 2 2 2H18c1.1 0 2-.9 2-2v-9.1c0-.27-.11-.52-.29-.71ZM15 5l2 2s-2-.02-2 0V5Zm3 11.5H9.5V4H13v4c0 .55.45 1 1 1h4v7.5Z" />
                              </svg>
                              Copy
                            </Button>
                          </div>
                          <div className="codeContainerBodyRoot">
                            <code>
                              <div className="codeContainerBodyContent">
                                <SyntaxHighlighter
                                  language="csharp"
                                  style={dracula}
                                >
                                  {`using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace DemoApp.ViewModels
{
    class HomePageViewModel : BindableObject
    {
       
            private string _virtualID;
            private string _amount;

            public HomePageViewModel()
            {
                AddBankCommand = new Command(OnAddBank);
                AddBeneficiaryCommand = new Command(OnAddBeneficiary);
                RequestNowCommand = new Command(OnRequestNow);
                ScanAndPayCommand = new Command(OnScanAndPay);
                SendNowCommand = new Command(OnSendNow);
            }

            public string VirtualID
            {
                get => _virtualID;
                set
                {
                    _virtualID = value;
                    OnPropertyChanged();
                }
            }

            public string Amount
            {
                get => _amount;
                set
                {
                    _amount = value;
                    OnPropertyChanged();
                }
            }

            public ICommand AddBankCommand { get; }
            public ICommand AddBeneficiaryCommand { get; }
            public ICommand RequestNowCommand { get; }
            public ICommand ScanAndPayCommand { get; }
            public ICommand SendNowCommand { get; }

            private void OnAddBank()
            {
                // Logic to add a bank
            }

            private void OnAddBeneficiary()
            {
                // Logic to add a beneficiary
            }

            private void OnRequestNow()
            {
                // Logic to request money
            }

            private void OnScanAndPay()
            {
                // Logic to scan and pay
            }

            private void OnSendNow()
            {
                // Logic to send money
            }
        }
}
`}
                                </SyntaxHighlighter>
                              </div>
                            </code>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleBack}
                        style={{
                          position: "fixed",
                          bottom: "20px",
                        }}
                      >
                        Back
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Tab>

            {/* Image to Image Tab */}
            <Tab eventKey="image-to-image" title="Sketch to Image">
              {!isGenerated ? (
                <div id="image-to-image" className="tab-pane">
                  <div className="file-dropzone-container">
                    <FileUploadDropZone
                      className="file-dropzone"
                      id="file-dropzone"
                      maxFileCount={1}
                      maxTotalFileSizeBytes={5000000000}
                      accept="image/*"
                      onFiles={(files, err) => {
                        if (!err && files.length > 0) {
                          setFilesUploaded(files);
                          const imageUrl = URL.createObjectURL(files[0]);
                          setInputImageSrc(imageUrl);
                        } else {
                          setFilesUploaded(null);
                          setInputImageSrc(null);
                        }
                      }}
                      uploadIcon={
                        <CloudUploadIcon
                          style={{
                            width: "30px",
                            height: "30px",
                            fill: "grey",
                          }}
                        />
                      }
                    />
                    {filesUploaded && (
                      <div className="files-uploaded">
                        <h4 className="mt-5">Files uploaded:</h4>
                        <ul className="list-group list-group-borderless">
                          {Array.from(filesUploaded).map((file, index) => (
                            <li
                              className="list-group-item list-item-left-control"
                              key={index}
                            >
                              <i className="modus-icons">check_circle</i>
                              <span>{file.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <Button className="generate-button" onClick={handleGenerate}>
                    Generate Image
                  </Button>

                  {isLoading && (
                    <div>
                      <ProgressBar
                        style={{ marginTop: "20px", width: "100%" }}
                        now={progress}
                      />
                      <div className="text-left text-dark"></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="output-pane">
                  <div id="input-content" className="input-content">
                    <h2 className="title" style={{ fontWeight: "bold" }}>
                      Input Image
                    </h2>
                    <img
                      src={inputImageSrc || "URL_OF_DEFAULT_IMAGE"}
                      alt="Input"
                      style={{ width: "100%", marginTop: "10px" }}
                    />
                  </div>
                  <div className="vertical-separator"></div>
                  <div id="output-content" className="output-content">
                    <h2 className="title" style={{ fontWeight: "bold" }}>
                      Generated Image
                    </h2>
                    <img
                      src={require("./sk.png")}
                      alt="Output"
                      style={{ width: "100%", marginTop: "10px" }}
                    />
                  </div>
                  <Button
                    onClick={handleBack}
                    style={{
                      position: "fixed",
                      bottom: "20px",
                    }}
                  >
                    Back
                  </Button>
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default App;
