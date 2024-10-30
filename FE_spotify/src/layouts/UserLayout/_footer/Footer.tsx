
import { Row, Col } from 'antd';
import { InstagramOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4">
      <div className="container mx-auto">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <h4>Công ty</h4>
            <ul>
              <li><a>Giới thiệu</a></li>
              <li><a>Việc làm</a></li>
              <li><a>For the Record</a></li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <h4>Cộng đồng</h4>
            <ul>
              <li><a>Dành cho các Nghệ sĩ</a></li>
              <li><a>Nhà phát triển</a></li>
              <li><a>Quảng cáo</a></li>
              <li><a>Nhà đầu tư</a></li>
              <li><a>Nhà cung cấp</a></li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <h4>Liên kết hữu ích</h4>
            <ul>
              <li><a>Hỗ trợ</a></li>
              <li><a>Ứng dụng Di động Miễn phí</a></li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <h4>Các gói của Spotify</h4>
            <ul>
              <li><a>Premium Individual</a></li>
              <li><a>Premium Student</a></li>
              <li><a>Spotify Free</a></li>
            </ul>
          </Col>
        </Row>
        <div className="flex justify-center mt-4">
          <a href="#" className="mr-4">
            <InstagramOutlined style={{ fontSize: 24 }} />
          </a>
          <a href="#" className="mr-4">
            <TwitterOutlined style={{ fontSize: 24 }} />
          </a>
          <a href="#" className="mr-4">
            <FacebookOutlined style={{ fontSize: 24 }} />
          </a>
        </div>
        <p className="text-center mt-4">© 2024 Spotify AB</p>
      </div>
    </footer>
  );
};

export default Footer;