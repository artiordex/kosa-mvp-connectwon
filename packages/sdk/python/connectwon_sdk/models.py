"""
Description : models.py - 📌 API 요청/응답 데이터 모델 정의
Author : Shiwoo Min
Date : 2025-09-20
"""

from dataclasses import dataclass
from typing import Any, Dict, List, Optional
from datetime import datetime


@dataclass
class AnalysisRequest:
    """AI 분석 요청 모델"""
    text: str
    model: str = "gpt-4"
    temperature: float = 0.7
    max_tokens: Optional[int] = None
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class AnalysisResult:
    """AI 분석 응답 모델"""
    result: str
    confidence: float
    tokens_used: int
    model: str
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class User:
    """사용자 모델"""
    id: str
    name: str
    email: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class Project:
    """프로젝트 모델"""
    id: str
    name: str
    description: Optional[str] = None
    owner_id: str
    status: str = "active"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class ScrapingTask:
    """웹스크래핑 작업 모델"""
    url: str
    selector: Optional[str] = None
    headers: Optional[Dict[str, str]] = None
    timeout: int = 30
    retry_count: int = 3


@dataclass
class ScrapingResult:
    """웹스크래핑 결과 모델"""
    url: str
    data: Any
    status_code: int
    content_type: str
    scraped_at: datetime
    metadata: Optional[Dict[str, Any]] = None
