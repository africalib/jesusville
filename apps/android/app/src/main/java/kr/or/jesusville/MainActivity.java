package kr.or.jesusville;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {
    private Activity _context;
    private WebView _webView; // 웹뷰 선언
    private WebSettings _webSettings; //웹뷰세팅
    private final String _appUrl = "http://jesusville.or.kr";
    private long backKeyPressedTime = 0;
    private BackPressCloseHandler _backPressCloseHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        _context = this;
        _backPressCloseHandler = new BackPressCloseHandler(_context);

        // 웹뷰 시작
        _webView = (WebView) findViewById(R.id.webView);

        _webView.setWebViewClient(new WebViewClient()); // 클릭시 새 창 안뜨게
        _webSettings = _webView.getSettings(); //세부 세팅 등록
        _webSettings.setJavaScriptEnabled(true); // 웹 페이지 자바스클비트 허용 여부
        _webSettings.setSupportMultipleWindows(false); // 새 창 띄우기 허용 여부
        _webSettings.setJavaScriptCanOpenWindowsAutomatically(false); // 자바스크립트 새창 띄우기(멀티 뷰) 허용 여부
        _webSettings.setLoadWithOverviewMode(true); // 메타 태그 허용 여부
        _webSettings.setUseWideViewPort(true); // 화면 사이즈 맞추기 허용 여부
        _webSettings.setSupportZoom(false); // 화면 줌 허용 여부
        _webSettings.setTextZoom(100);
        _webSettings.setBuiltInZoomControls(false); // 화면 확대 축소 허용 여부
        //_webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN); // 컨텐츠 사이즈 맞추기
        _webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE); // 브라우저 캐시 허용 여부
        _webSettings.setDomStorageEnabled(true); // 로컬 저장소 허용 여부

        _webView.loadUrl(_appUrl);

        _webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();

                if (url.startsWith(_appUrl)) {
                    view.loadUrl(url);
                } else if (url.startsWith("tel:") || url.startsWith("sms:") || url.startsWith("mailto:")) {
                    Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse(url));
                    startActivity(intent);
                } else {
                    Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(i);
                }

                return true;
            }
        });

        _webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                return super.onJsAlert(view, url, message, result);
            }
        });
    }

    @Override
    public void onBackPressed() {
        String url = _webView.getUrl();

        if (!url.contains("#")) {
            _backPressCloseHandler.onBackPressed();
        } else if (_webView.canGoBack()) {
            _webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}